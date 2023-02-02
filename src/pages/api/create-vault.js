import db from "@/database/db";
import { _getMetadata, maskStream } from "@/utils";

export default async function handler(req, res) {
  try {
    let metadata = req.body;
    console.log(metadata);
    let user = await db.getUser("controller", metadata.controller);
    if (!user) {
      await db.addUser(metadata.controller);
    }
    let vault = await db.save(
      metadata.ipfsUrl,
      metadata.controller,
      metadata.mediaTitle
    );
    res.status(201).end();
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
}
