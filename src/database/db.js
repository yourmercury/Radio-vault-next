import { Schema, createConnection } from "mongoose";

const conn = createConnection(process.env.MONGODB_URI);

class Database {
  MediaModel = conn.model(
    "metadataRecord",
    new Schema(
      {
        ipfsUrl: {
          type: String,
          required: true,
          unique: true,
        },

        controller: {
          type: String,
          required: true,
        },

        mediaTitle: {
          type: String,
          required: true,
        },

        streamCount: {
          type: Number,
          default: 0,
        },

        clients: {
          type: [String],
          default: [],
        },

        regions: {
          type: [String],
          default: [],
        },

        blackList: {
          type: [String],
          default: [],
        },
      },
      { timestamps: true }
    )
  );

  UserModel = conn.model(
    "user",
    new Schema(
      {
        controller: {
          type: String,
          required: true,
          unique: true,
        },

        whiteList: {
          type: [String],
          default: ["localhost:3001"],
        },

        blackList: {
          type: [String],
          default: [],
        },

        totalStreams: {
            type: Number,
            default: 0,
        }
      },
      { timestamps: true }
    )
  );


  saveTrials = 6;

  async save(ipfsUrl, controller, mediaTitle) {
    try {
      let toSave = new this.MediaModel({ ipfsUrl, controller, mediaTitle });
      await toSave.save();
    } catch (error) {
      throw(error);
    }
  }

  async getMetadataRecord(field, value) {
    try {
      let doc = await this.MediaModel.findOne({ [field]: value }).exec();
      return doc;
    } catch (error) {
      console.log(error);
    }
  }

  async getMetadataRecordById(id) {
    try {
      let doc = await this.MediaModel.findById(id).exec();
      return doc;
    } catch (error) {
      throw(error)
    }
  }

  async getUserMetadataRecords(id) {
    try {
      let docs = await this.MediaModel.find({controller: id}).exec();
      let values = [];
      docs.forEach((doc)=>{
        values.push(doc);
      });
      return values;
    } catch (error) {
      throw(error);
    }
  }

  async incrementStreamCount(id){
    try {
       let doc = await this.MediaModel.findById(id).exec();
       let user = await this.UserModel.findOne({controller: doc.controller}).exec();
       user.$inc("totalStreams", 1);
       doc.$inc("streamCount", 1);
       await doc.save();
       await user.save();
       return doc;
    }catch(error){
        console.log(error);
    }
  }

  async getUserById(id){
    try {
      let doc = await this.UserModel.findById(id).exec();
      return doc
    } catch (error) {
      throw(error);
    }
  }

  async getUser(field, value){
    try {
      let doc = await this.UserModel.findOne({[field]: value}).exec();
      return doc;
    } catch (error) {
      throw(error);
    }
  }

  async checkWhiteList(id, domain){
    try {
      let doc = await this.getUserById(id);
      let whiteList = doc.whiteList;
      return whiteList.includes(domain);
    } catch (error) {
      throw(error);
    }
  }

  async whiteListDomain(id, domain){
    try {
      let doc = await this.getUserById(id);
      doc.whiteList.includes(domain) || doc.whiteList.push(domain);
      await doc.save();
    } catch (error) {
      throw(error);
    }
  }

  async removeFromWhiteList(id, domain){
    try {
      let doc = await this.getUserById(id);
      doc.whiteList.includes(domain) && doc.whiteList.splice(doc.whiteList.indexOf(domain), 1);
      await doc.save();
    } catch (error) {
      throw(error);
    }
  }


  async addUser(controller) {
    try {
      let toSave = new this.UserModel({controller});
      await toSave.save();
    } catch (error) {
      throw(error);
    }
  }
}

const db = new Database();

export default db;