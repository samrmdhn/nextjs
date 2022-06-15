import db from "../../../../libs/db";import authorization from "../../../../middlewares/authorization";
export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  const auth = await authorization(req, res);
  const { id } = req.query;
  const { title, content } = req.body;
  console.log(req.body, id);
  const update = await db("posts").where({ id }).update({ title, content });
  console.log(update);
  const updatedPost = await db("posts").where({ id }).first();

  res.status(200);

  res.json({
    message: "Post updated succesfully",
    data: updatedPost,
  });
}
