import React, { useState } from "react"; 
//Ini library buat bikin cookies
import Cookie from "js-cookie";
import Router from "next/router";
//Ini buat ambil cookies dari server side
import cookies from "next-cookies";
import { unauthPage } from "../../middlewares/authorizationPage";

//Server side rendering
export async function getServerSideProps(ctx) {
    //Ini buat redirect page di server side
  await unauthPage(ctx)
  return {props: {}}
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showStatus, setShowStatus] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const fields = {
      email,
      password,
    };

    const loginReq = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    //Kalo berhasil login dikasih cookies di web storage
    if (loginReq.ok) {
      const loginRes = await loginReq.json();
      Cookie.set("token", loginRes.token);
      setShowStatus("Login success");

      Router.push("/posts");
    } else {
      return setShowStatus(`Email or password not match`);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          value={email}
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          value={password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
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
