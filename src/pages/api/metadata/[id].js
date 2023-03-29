import db from "@/database/db";
import { _getMetadata, maskStream, parseUrl } from "@/utils";

export default async function handler(req, res) {
    try {
        let id = req.query.id;
        let client = req.headers.referer || req.headers.host;
        console.log(id);
        // return
        let metadata;
        let record = await db.getMetadataRecordById(id);
        if (!record) {
          res.status(404).json({ success: false });
          return;
        }
        let user = await db.getUser("controller", record.controller);
        let whiteListed = user ? user.whiteList.includes(client) : true;
        
        if (!whiteListed) {
            res.status(403).json({ error: "permission denied" });
            return;
        }

        let url = record.ipfsUrl;
        metadata = await _getMetadata(url);
        if (metadata.video)
          metadata.video = `${process.env.DOMAIN_FRONTEND}/iframe/${id}`;
        // if (metadata.image)
        //   metadata.image = `${process.env.DOMAIN_FRONTEND}/iframe/${id}`;
        if (metadata.audio)
          metadata.audio = `${process.env.DOMAIN_FRONTEND}/iframe/${id}`;

        metadata.streams = record.streamCount;
        res.status(200).json({ ...metadata });
      } catch (error) {
        console.log(error);
        res.status(404).json({ success: false });
      }
}