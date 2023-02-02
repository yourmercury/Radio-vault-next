import db from "@/database/db";
import { _getMetadata, maskStream, parseUrl } from "@/utils";

export default async function handler(req, res) {
    try {
        let id = req.query.id;
        console.log(id);
        // return
        let metadata;
        let record = await db.getMetadataRecordById(id);
        if (!record) {
          res.status(404).json({ success: false });
          return;
        }
        let url = record.ipfsUrl;
        metadata = await _getMetadata(url);
        if (metadata.video)
          metadata.video = parseUrl(metadata.video);
        if (metadata.image)
          metadata.image = parseUrl(metadata.image);
        if (metadata.audio)
          metadata.audio = parseUrl(metadata.audio);
        // if (metadata.video)
        //   metadata.video = `${process.env.DOMAIN}/media/video/${id}`;
        // if (metadata.image)
        //   metadata.image = `${process.env.DOMAIN}/media/video/${id}`;
        // if (metadata.audio)
        //   metadata.audio = `${process.env.DOMAIN}/media/audio/${id}`;

        metadata.streams = record.streamCount;
        res.status(200).json({ ...metadata });
      } catch (error) {
        console.log(error);
        res.status(404).json({ success: false });
      }
}