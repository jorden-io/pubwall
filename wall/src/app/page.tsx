"use client";
import { useEffect, useRef, useState } from "react";
import EnterName from "./components/name";
import Head from "next/head";
import ButtonOptions from "./components/buttonsOptions";
import Nav from "./components/nav";
import GlobalChat from "./components/globalChat";
import Loading from "./components/loading";
import { decode } from "jsonwebtoken";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

let time = 0;
let currentlyRunning = false;
let threeTries = 0;
let t = 0;
export default function Home() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  //const [url, setUrl] = useState<string>("");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const fetchMessags = async () => {
    try {
      const data = await fetch(
        "https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/all/"
      );
      const res = await data.json();
      setState(res);
    } catch (err) {
      console.log(err);
    }
  };
  const subMessage = async (data: string, url: string) => {
    // if (!inputFileRef.current?.files) {
    //   throw new Error("No file selected");
    // }
let burl = "";
    const file = inputFileRef!.current!.files![0];
    if(file){
    const newBlob = await upload(file.name ? file.name : "", file ? file : "", {
      access: "public",
      handleUploadUrl: "/api/avatar/upload",
    });
    setBlob(newBlob);
    burl = newBlob.url;
    };
    threeTries = 0;
    const body = {
      data,
      name: localStorage.getItem("name"),
      gender: localStorage.getItem("gender"),
      url: burl,
    };
    await fetch(
      "https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/message",
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
        if (time >= 35) {
          clearInterval(pollingInterval);
          time = 0;
          currentlyRunning = false;
        }
      }, 3000);
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
            "https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/all/"
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
          console.log("from 10");
          fetchMessags();
          document
            .getElementById("hiddenp")
            ?.scrollIntoView({ behavior: "smooth" });
          threeTries += 1;
        }
      }
    }, 10000);
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
        <Nav title="global chat" />
        {/* <Info /> */}
        <ButtonOptions />
        <GlobalChat gmessageArray={state} />
        <h2
          style={{
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            margin: "10px",
            fontWeight: "100",
          }}
        >
          speaking as-{" "}
          <span style={{ color: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")! }}>
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
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr
              style={{
                borderRadius: "100px",
                marginBottom: "5px",
                width: "95%",
                border: "solid 1px rgb(60 60 60)",
              }}
            ></hr>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "100px" }}
          >
            <p style={{ fontWeight: "100" }}>chat</p>
            <span
              style={{
                borderRadius: "100px",
                height: "20px",
                backgroundColor: "rgb(60 60 60)",
                padding: "1px",
              }}
            ></span>
            <p style={{ fontWeight: "100" }}>info</p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
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
            {/* <div> */}
            <input
              id={"upload"}
              name="file"
              ref={inputFileRef}
              type="file"
              required
              hidden
            />
            <label
              htmlFor={"upload"}
              style={{
                padding: "20px",
                margin: "10px",
                borderRadius: "5px",
                border: `solid 1px ${(localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!}`,
                background: "rgb(30 30 30)",
              }}
            >
              upload
            </label>
            {/* </div> */}
            <button
              style={{
                color: "white",
                width: "20%",
                padding: "20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                fontSize: "16px",
                margin: "10px",
              }}
              onClick={() => {
                setMessage("");
                (document.getElementById("minput") as HTMLInputElement).value =
                  "";
                //if (message.length > 1) {
                subMessage(message, "");
                //}
              }}
            >
              send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
