import db from "@/database/db";
// import { getMetadata, maskStream } from "@/utils";

import Cors from "cors";

const cors = Cors({
  method: ["GET"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  try {
    let address = req.query.address;
    let metadatas = await db.getUserMetadataRecords(address);
    res.status(200).json({ metadatas });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
}
