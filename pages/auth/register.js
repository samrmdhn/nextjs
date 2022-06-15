import React, { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  //Ini buat redirect page di server side
  await unauthPage(ctx);
  return { props: {} };
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const fields = { email, password };
    console.log(fields);
    const registerReq = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-type": "application/json",
      },
    });
    setEmail("");
    setPassword("");
    setShowNotification(true);
  };

  return (
    <div>
      <h1>Create new account</h1>
      <div style={{ position: "relative" }}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          ></input>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          ></input>
          <button type="submit">Register</button>
        </form>
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          style={{
            position: "absolute",
            marginTop: -22,
            marginLeft: 320,
            cursor: "pointer",
          }}
        >
          👁
        </div>
      </div>

      <div>
        {showNotification ? (
          <div
            style={{
              backgroundColor: "blue",
              borderRadius: 5,
              width: 300,
              marginTop: 20,
              color: "white",
            }}
          >
            Account created successfully!
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
