import { FC, useState } from "react";
import { sign } from "jsonwebtoken";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import frog from "../public/frog.png"
interface props {}
const EnterName: FC<props> = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState("string");
  const subName = async (name: string) => {
    if (name.length < 2) {
      alert("name too short, must be greater than 2 chars");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { name, gender };
    const res = await fetch(
      "https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/createuser/",
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
          marginTop: "20px",
        }}
      >
        {" "}
        <span style={{ color: "green" }}>Frog</span>{" "}
        <span style={{ color: "white" }}>Chats</span>{" "}
        <span style={{ color: "white" }}>.com</span>
      </h1>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(15 15 15)",
            // border: "solid 2px #2bb41e",
            //boxShadow: "0px 0px 8px black",
            borderRadius: "5px",
            padding: "50px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0px",
            width: "600px",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "100" }}>
            enter display name
          </h1>
          <p
            style={{
              textAlign: "center",
              margin: "5px",
              fontWeight: "100",
              color: "whitesmoke",
            }}
          >
            {" "}
            and select gender
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <BsGenderFemale
              onClick={() => {
                setGender("female");
              }}
              style={{
                width: "100%",
                backgroundColor: "#FFB5C0",
                transition: "0.5s",
                border: gender == "female" ? "solid 1px white" : "none",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "40px",
                marginRight: "2.5px",
              }}
            />
            <BsGenderMale
              onClick={() => {
                setGender("male");
              }}
              style={{
                width: "100%",
                backgroundColor: "#87cefa",
                transition: "0.5s",
                border: gender == "male" ? "solid 1px white" : "none",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "40px",
                marginLeft: "2.5px",
              }}
            />
          </div>
          <input
            style={{
              color: "white",
              borderRadius: "5px",
              fontSize: "16px",
              textAlign: "center",
              // border: "solid 2px lightseagreen",
              border: "none",
              padding: "15px",
              margin: "5px",
              backgroundColor: "rgb(40 40 40)",
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="froggy . . . ?"
          ></input>
          <button
            style={{
              borderRadius: "5px",
              padding: "15px",
              margin: "5px",
              backgroundColor: "grey",
              color: "white",
              fontWeight: "500",
              fontSize: "13px",
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
              color: "white",
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
            deleted within a week or before if you choose to log out, have fun!{" "}
          </p>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <img style={{width: "300px"}} src={frog.src}/>
      </div>
    </div>
  );
};
export default EnterName;
