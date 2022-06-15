import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  const auth = await authorization(req, res);
  const getPostById = await db("posts").where({ id }).first();

  res.status(200);
  res.json({
    message: `Post with ${id} found`,
    data: getPostById,
  });
}
