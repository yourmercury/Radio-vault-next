import db from "@/database/db";
// import { getMetadata, maskStream } from "@/utils";

export default async function handler(req, res) {
  try {
    let id = req.query.id;
    let metadata = await db.getMetadataRecordById(id);
    res.status(200).json({ metadata });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
}
