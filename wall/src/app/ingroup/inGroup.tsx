"use client";
import { FC, useEffect, useState } from "react";
import Nav from "../components/nav";
import { decode } from "jsonwebtoken";
import Chat from "../components/chat";
interface props {
  gid: number;
  groupname: string;
  name: string;
  description: string;
}
let time = 0;
let currentlyRunning = false;
let threeTries = 0;
const InGroup: FC<props> = ({ description, gid, groupname, name }) => {
  interface token {
    uid: number;
  }
  const uid = (decode(localStorage.getItem("token")!) as token).uid;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const fetchMessags = async () => {
    try {
      const data = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/groupmessages/${gid}`
      );
      const gmessages = await data.json();
      setMessages(gmessages);
    } catch (err) {
      console.log(err);
    }
  };
  const subGroupMessage = async (gmessage: string) => {
    threeTries = 0;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { uid: uid, gid: gid, gmessage: gmessage };
    await fetch(
      `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/sendgroupmessage`,
      { method: "POST", headers: myHeaders, body: JSON.stringify(body) }
    );
    fetchMessags().then(() => {
      document
        .getElementById("hiddenp")
        ?.scrollIntoView({ behavior: "smooth" });
    });
    if (currentlyRunning === false) {
      currentlyRunning = true;
      const pollingInterval = setInterval(() => {
        fetchMessags().then(() => {
          document
            .getElementById("hiddenp")
            ?.scrollIntoView({ behavior: "smooth" });
        });
        time += 5;
        console.log(time);
        if (time >= 20) {
          clearInterval(pollingInterval);
          time = 0;
          currentlyRunning = false;
        }
      }, 4000);
    }
  };
  useEffect(() => {
    (async () => {
      fetchMessags().then(() => {
        document
          .getElementById("hiddenp")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    })();
    setInterval(() => {
      if (threeTries <= 4) {
        if (!currentlyRunning) {
          console.log("from 20");
          fetchMessags().then(() => {
            document
              .getElementById("hiddenp")
              ?.scrollIntoView({ behavior: "smooth" });
          });
          threeTries += 1;
        }
      }
    }, 20000);
  }, []);
  return (
    <div>
      <Nav title={`${groupname}`} />
      <div style={{ display: "flex", justifyContent: "center" }}>

        <p>
          {" "}
          <span style={{ fontWeight: "100" }}>{`creator - `}</span>{" "}
          <span style={{ color: "orange" }}>{name}</span>
        </p>
      </div>
      <Chat gmessageArray={messages} />
      <div style={{ display: "flex", justifyContent: "center" }}>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          bottom: "0px",
          position: "fixed",
          width: "100%",
        }}
      >
        <input
          id="gminput"
          placeholder="input . . ."
          style={{
            color: "white",
            fontSize: "16px",
            width: "100%",
            padding: "20px",
            border: "none",
            backgroundColor: "rgb(40 40 40)",
            borderRadius: "5px",
            margin: "10px",
          }}
          onClick={(e) => e.preventDefault()}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          style={{
            color: "white",
            width: "20%",
            padding: "20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#2bb41e",
            fontSize: "16px",
            margin: "10px",
          }}
          onClick={() => {
            setMessage("");
            (document.getElementById("gminput") as HTMLInputElement).value = "";
            if (message.length > 1) {
              subGroupMessage(message);
            }
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};
export default InGroup;
