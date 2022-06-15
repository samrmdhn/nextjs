import React, { useEffect, useState } from "react";import "bootstrap/dist/css/bootstrap.min.css";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";
export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  //Gabisa fetch server side di node js
  //Fetch ini adalah kemiripan yang dibuat oleh node dengan fungsi fetch pada browser
  //URL harus absolute, contoh http://localhost/

  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();

  return {
    props: {
      token,
      posts: posts.data,
    },
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);
  const [datas, setDatas] = useState([]);
  const { token } = props;

  const getRandomData = async () => {
    const randomData = await fetch(
      "https://dummyjson.com/users?limit=100&select=firstName,lastName,age,gender,email,phone,address,height,weight,university",
      {
        method: "GET",
      }
    );

    const res = await randomData.json();
    console.log(res.users);
    //  JSON.stringify(res);
    //setDatas(res);
  };

  useEffect(() => {
    getRandomData();
  }, []);

  console.log(datas);

  const deletePostHandler = async (postId) => {
    const deleteReq = await fetch(`/api/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const res = await deleteReq.json();

    //Pake filter karena yang perlu rerender component state post
    //Jangan pake useEffect karena di SSR gabakal jalan
    const postsFiltered = posts.filter((post) => {
      return postId !== post.id && post;
    });

    setPosts(postsFiltered);
  };

  const editRouter = (postId) => {
    Router.push(`/posts/edit/${postId}`);
  };

  return (
    <div>
      <Nav />
      <h1>Posts</h1>
      <div className="container">
        <div className="row">
          <div style={{ fontWeight: "bolder" }}>ID TITLE CONTENT</div>
          {posts.map((post) => {
            return (
              <div key={post.id} className="col-4">
                <div className="card text-dark bg-light mb-3">
                  <div className="card-header">
                    {post.title}
                    <span className="badge bg-primary">ID {post.id}</span>
                  </div>
                  <div className="card-body">
                    {post.content}
                    <button
                      onClick={() => {
                        editRouter(post.id);
                      }}
                      className="btn btn-dark"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deletePostHandler(post.id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {datas.map((data) => {
        return (
          <>
            <h5>{data.firstName}</h5>
          </>
        );
      })}
    </div>
  );
}
