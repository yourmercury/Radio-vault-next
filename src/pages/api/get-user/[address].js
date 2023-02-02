import db from "@/database/db";
import { getMetadata, maskStream } from "@/utils";

export default async function handler(req, res) {
  try {
    let address = req.query.address;
    let user = await db.getUser("controller", address);
    let metadatas = await db.getUserMetadataRecords(address);
    if (!user) {
      await db.addUser(address);
      user = await db.getUser("controller", address);
      metadatas = await db.getUserMetadataRecords(address);
    }
    res.status(200).json({ user, metadatas });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "User not found" });
  }
}
