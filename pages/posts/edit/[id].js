import React, { useState } from "react";
import Router from "next/router";
import { authPage } from "../../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch("http://localhost:3000/api/posts/details/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await postReq.json();

  console.log(res);

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function PostCreate(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showStatus, setShowStatus] = useState("");
  const { token } = props;

  const { post } = props;

  const editHandler = async (e) => {
    e.preventDefault();

    const fields = {
      title,
      content,
    };

    const createReq = await fetch(
      "http://localhost:3000/api/posts/update/" + post.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(fields),
      }
    );

    if (createReq.ok) {
      setShowStatus("Post edited successfully!");
      Router.push("/posts");
    } else {
      setShowStatus("Post edit failed");
    }

    console.log(fields);
  };
  return (
    <div>
      <h1>Edit post {post.id}</h1>
      <form onSubmit={editHandler}>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          defaultValue={post.title}
          type="text"
          placeholder="Title"
        />
        <br />
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          defaultValue={post.content}
          placeholder="Content title"
        />
        <br />
        <button type="submit">Save changes</button>
      </form>
      <div
        style={{
          backgroundColor: "black",
          borderRadius: 5,
          width: 300,
          marginTop: 20,
          color: "white",
        }}
      >
        {showStatus}
      </div>
    </div>
  );
}
