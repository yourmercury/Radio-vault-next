import db from "@/database/db";

export default async function handler(req, res) {
  try {
    let address = req.query.address;
    let whitelist = req.body;
    let user = await db.getUser("controller", address);
    if (!user) {
      await db.addUser(address);
      user = await db.getUser("controller", address);
    }
    user.whiteList = whitelist;
    await user.save();
    let metadatas = await db.getUserMetadataRecords(address);
    res.status(200).json({ user, metadatas });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "User not found" });
  }
}
