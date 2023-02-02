// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "@/database/db";
import { getMetadata, maskStream } from "@/utils";

export default async function handler(req, res) {
    try {
        let id = req.query.id;
        let type = "video";
        let client = req.headers.referer || req.headers.host;
        console.log(client);

        console.log(process.env.MONGODB_URI)
        
        if(id.length < 24){
            res.status(404).json({ success: false });
            return;
        }

        client = client.replace("http://", "").replace("https://","").split("/")[0];
        console.log(client);
    
        let { record, metadata } = await getMetadata(id, db);
        let ipfsUrl = metadata[type];
        if (!ipfsUrl)
          res.status(404).json({ success: false, error: "media not found" });
    
        let user = await db.getUser("controller", record.controller);
        let whiteListed = user ? user.whiteList.includes(client) : true;
        (whiteListed) &&
          maskStream(ipfsUrl, res, record.mediaTitle);
        if (!whiteListed) res.status(403).json({ error: "permission denied" });
      } catch (error) {
        console.log(error);
        res.status(404).json({ success: false });
      }
}
