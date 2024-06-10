"use client";
import { useEffect, useState } from "react";
import EnterName from "./components/name";
import Head from "next/head";
import { GiTheater } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { BsInfoSquare } from "react-icons/bs";

export default function Home() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Credentials", "true");
  // myHeaders.append("Access-Control-Allow-Origin", "*");

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const subMessage = async (data: string) => {
    const body = { data, name: localStorage.getItem("name") };
    console.log(body);
    await fetch(
      "https://vi2bi0yw08.execute-api.us-east-2.amazonaws.com/prod/message/",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    window.location.reload();
  };
  useEffect(() => {
    setLoading(false);
    (async () => {
      try {
        const data = await fetch(
          "https://vi2bi0yw08.execute-api.us-east-2.amazonaws.com/prod/all/"
          //,{ headers: myHeaders }
        );
        const res = await data.json();
        console.log(res);
        setState(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>loading...</h1>
      </div>
    );
  }
  if (!localStorage.getItem("name")) {
    return <EnterName />;
  } else {
    document.getElementById("hiddenp")?.scrollIntoView({ behavior: "smooth" });
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <div style={{display: "flex", justifyContent: "center"}}>
          <FaBars style={{fontSize: "25px", margin: "20px", color: "lightseagreen"}} />
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "100",
            margin: "20px",
          }}
        >
          Global Chat
        </h1>
          <BsInfoSquare  style={{ fontSize: "25px", margin: "20px", color: "grey"}}/>
        </div>
        <div
          style={{
            backgroundColor: "rgb(45 45 45)",
            boxShadow: "inset 0px 0px 8px black",
            //border: "solid 1px lightseagreen",
            height: "350px",
            margin: "0px",
            overflowY: "scroll",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {state.map((e: any) => (
            <div key={e.mid}>
              <div
                onClick={() => {
                  document
                    .getElementById("hiddenp")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                key={e!.mid!}
                style={{ display: "flex", padding: "10px", fontWeight: "150" }}
              >
                <p
                  style={{
                    color:
                      localStorage.getItem("name") == e.name
                        ? "lightseagreen"
                        : "white",
                  }}
                >
                  {localStorage.getItem("name") == e.name ? "me" : e.name}
                </p>
                <span>
                  -({e!.time[5]}
                  {e!.time[6]}/{e!.time[8]}
                  {e!.time[9]})-
                  <span style={{ fontWeight: "600" }}> {e!.data!}</span>
                </span>
              </div>
              <hr style={{ border: "solid 1px rgb(80 80 80)" }}></hr>
            </div>
          ))}
          <p id="hiddenp"></p>
        </div>
        <h2 style={{fontSize: "1.2rem", display: "flex", justifyContent: "center", fontWeight: "100"}}>speaking as: {localStorage.getItem("name")}</h2>
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
            placeholder="input . . ."
            style={{
              fontSize: "16px",
              width: "100%",
              padding: "20px",
              border: "none",
              backgroundColor: "rgb(40 40 40)",
              borderRadius: "0px",
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
              borderRadius: "0px",
              backgroundColor: "lightseagreen",
            }}
            onClick={() => subMessage(message)}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}
