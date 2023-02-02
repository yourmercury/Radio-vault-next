import db from "@/database/db";
// import { getMetadata, maskStream } from "@/utils";

export default async function handler(req, res) {
    try {
        let address = req.query.address;
        let metadatas = await db.getUserMetadataRecords(address);
        res.status(200).json({ metadatas });
      } catch (error) {
        console.log({ error });
        res.status(500).json(error);
      }
}