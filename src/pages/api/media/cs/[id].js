import db from "@/database/db";

export default async function handler(req, res) {
    db.incrementStreamCount(req.query.id);
    res.status(201).end();
}