import React, { useState } from "react";import Router from "next/router";
import { authPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token,
    },
  };
}

export default function PostCreate(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showStatus, setShowStatus] = useState("");
  const { token } = props;

  const submitHandler = async (e) => {
    e.preventDefault();

    const fields = {
      title,
      content,
    };

    const createReq = await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (createReq.ok) {
      setShowStatus("Post created successfully!");
      Router.push("/posts");
    } else {
      setShowStatus("Post failed to post");
    }
  };
  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          placeholder="Title"
        />
        <br />
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          placeholder="Content title"
        />
        <br />
        <button type="submit">Submit</button>
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
