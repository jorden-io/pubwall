"use client";
import { useEffect, useState } from "react";
import EnterName from "./components/name";
import Head from "next/head";
import { FaBars } from "react-icons/fa";
import { BsInfoSquare } from "react-icons/bs";
import Info from "./components/info";

let time = 0;
let currentlyRunning = false;
let threeTries = 0;
export default function Home() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Credentials", "true");
  // myHeaders.append("Access-Control-Allow-Origin", "*");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const fetchMessags = async () => {
    try {
      const data = await fetch(
        "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/all/"
        //,{ headers: myHeaders }
      );
      const res = await data.json();
      setState(res);
    } catch (err) {
      console.log(err);
    }
  };
  const subMessage = async (data: string) => {
    threeTries = 0;
    const body = { data, name: localStorage.getItem("name") };
    await fetch(
      "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/message/",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    fetchMessags();
    if (currentlyRunning === false) {
      currentlyRunning = true;
      const pollingInterval = setInterval(() => {
        fetchMessags();
        time += 5;
        console.log(time);
        document
          .getElementById("hiddenp")
          ?.scrollIntoView({ behavior: "smooth" });
        if (time >= 20) {
          clearInterval(pollingInterval);
          time = 0;
          currentlyRunning = false;
        }
      }, 4000);
    }
  };

  useEffect(() => {
    setLoading(false);
    if (true) {
      (async () => {
        try {
          const data = await fetch(
            "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/all/"
            //,{ headers: myHeaders }
          );
          const res = await data.json();
          setState(res);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    setInterval(() => {
      if (threeTries <= 3) {
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
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontWeight: "100", marginTop: "200px", color: "#2bb41e" }}>
          loading . . .
        </h1>
      </div>
    );
  }
  if (!localStorage.getItem("name")) {
    return <EnterName />;
  } else {
    document.getElementById("hiddenp")?.scrollIntoView({ behavior: "smooth" });
    return (
      <div id="message-page">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaBars
            style={{
              fontSize: "25px",
              margin: "20px",
              color: "#2bb41e",
            }}
          />
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "100",
              margin: "20px",
            }}
          >
            FrogChats
          </h1>
          <BsInfoSquare
            style={{ fontSize: "25px", margin: "20px", color: "whitesmoke" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "1000px",
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
                  style={{
                    display: "flex",
                    padding: "10px",
                    fontWeight: "150",
                  }}
                >
                  <p
                    style={{
                      color:
                        localStorage.getItem("name") == e.name
                          ? "#2bb41e"
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
        </div>
        <h2
          style={{
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            fontWeight: "100",
          }}
        >
          speaking as: {localStorage.getItem("name")}
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
              backgroundColor: "#2bb41e",
              fontSize: "16px",
            }}
            onClick={() => {
              setMessage("");
              (document.getElementById("minput") as HTMLInputElement).value =
                "";
              if (message.length > 1) {
                subMessage(message);
              }
              setTimeout(() => {
                document
                  .getElementById("hiddenp")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 600);
            }}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}
