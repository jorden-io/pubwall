import { FC, useState } from "react";
import { sign } from "jsonwebtoken";
interface props {}
const EnterName: FC<props> = () => {
  const [name, setName] = useState<string>("");
  const subName = async (name: string) => {
    if (name.length < 2) {
      alert("name too short, must be greater than 2 chars");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { name };
    const res = await fetch(
      "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/createuser/",
      { method: "POST", headers: myHeaders, body: JSON.stringify(body) }
    );
    const user = await res.json();
    const jwt = sign({ uid: user[0].uid }, "bia", {
      algorithm: "HS256",
      expiresIn: "24hrs",
    });
    localStorage.setItem("name", name);
    localStorage.setItem("token", jwt);
    window.location.reload();
  };
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "100",
          margin: "10px",
        }}
      >
        {" "}
        <span style={{ color: "#2bb41e" }}>Frog</span>{" "}
        <span style={{ color: "orange" }}>Chats</span>{" "}
        <span style={{ color: "grey" }}>.com</span>
      </h1>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(15 15 15)",
            border: "solid 2px #2bb41e",
            borderRadius: "10px",
            padding: "80px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0px",
            width: "500px",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "100" }}>
            enter a name?
          </h1>
          <input
            style={{
              color: "white",
              borderRadius: "10px",
              fontSize: "16px",
              textAlign: "center",
              border: "solid 2px orange",
              padding: "15px",
              margin: "5px",
              backgroundColor: "rgb(40 40 40)",
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="froggy . . ."
          ></input>
          <button
            style={{
              borderRadius: "10px",
              padding: "10px",
              margin: "5px",
              backgroundColor: "#2bb41e",
              color: "whitesmoke",
              border: "none",
            }}
            onClick={() => {
              localStorage.setItem("sends", "0");
              subName(name);
            }}
          >
            submit name
          </button>
          <p
            style={{
              textAlign: "center",
              borderRadius: "0px",
              color: "orange",
              fontWeight: "1000",
            }}
          >
            NOTE!
          </p>
          <p
            style={{
              textAlign: "center",
              fontWeight: "100",
              color: "whitesmoke",
            }}
          >
            FrogChats is for fun, anonymous, temporary chatting. Everything is
            deleted within a week or before if you choose to log out:) have fun!{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default EnterName;
