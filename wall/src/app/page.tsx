"use client";
import { useEffect, useState } from "react";
import EnterName from "./components/name";
import Head from "next/head";
import ButtonOptions from "./components/buttonsOptions";
import Nav from "./components/nav";
import GlobalChat from "./components/globalChat";
import Loading from "./components/loading";
import { decode } from "jsonwebtoken";

let time = 0;
let currentlyRunning = false;
let threeTries = 0;
let t = 0;
export default function Home() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const fetchMessags = async () => {
    try {
      const data = await fetch(
        "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/all/"
      );
      const res = await data.json();
      setState(res);
    } catch (err) {
      console.log(err);
    }
  };
  const subMessage = async (data: string) => {
    threeTries = 0;
    const body = { data, name: localStorage.getItem("name"), gender: localStorage.getItem("gender") };
    await fetch(
      "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/message/",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
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

  interface token {
    uid: number;
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      t = (decode(localStorage.getItem("token")!) as token).uid;
    }
    setLoading(false);
    if (true) {
      (async () => {
        try {
          const data = await fetch(
            "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/all/"
          );
          const res = await data.json();
          setState(res);
        } catch (err) {
          console.log(err);
        }
      })().then(() => {
        document
          .getElementById("hiddenp")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
    setInterval(() => {
      if (threeTries <= 4) {
        if (!currentlyRunning) {
          console.log("from 20");
          fetchMessags();
          document
            .getElementById("hiddenp")
            ?.scrollIntoView({ behavior: "smooth" });
          threeTries += 1;
        }
      }
    }, 20000);
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!t) {
    return <EnterName />;
  }
  if (!localStorage.getItem("name")) {
    return <EnterName />;
  } else {
    document.getElementById("hiddenp")?.scrollIntoView({ behavior: "smooth" });
    return (
      <div id="message-page">
        <Head>
          <title>Frog Chats</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <Nav title="Global FrogChats" />
        {/* <Info /> */}
        <ButtonOptions />
        <GlobalChat gmessageArray={state} />
        <h2
          style={{
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            fontWeight: "100",
          }}
        >
          speaking as-{" "}
          <span style={{ color: "orange" }}>
            {" "}
            {localStorage.getItem("name")}
          </span>
        </h2>
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
            id="minput"
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
              (document.getElementById("minput") as HTMLInputElement).value =
                "";
              if (message.length > 1) {
                subMessage(message);
              }
            }}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}
