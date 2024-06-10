"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const subMessage = async (data: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { data };
    await fetch(
      "https://vi2bi0yw08.execute-api.us-east-2.amazonaws.com/prod/message",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        referrerPolicy: "unsafe-url",
      }
    );
  };
  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://vi2bi0yw08.execute-api.us-east-2.amazonaws.com/prod/all",
        { method: "GET", mode: "no-cors" }
      );
      const r = await data.json();
      setState(r);
      console.log(r);
    })();
  }, [state]);
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "100",
          margin: "20px",
        }}
      >
        welcome, dont say anything dumb
      </h1>
      <div
        style={{
          backgroundColor: "rgb(45 45 45)",
          boxShadow: "inset 0px 0px 8px black",
          //border: "solid 1px lightseagreen",
          height: "500px",
          margin: "30px",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {state.map((e: any) => (
          <div key={e.mid}>
            <p key={e!.mid!} style={{ padding: "10px", fontWeight: "150" }}>
              {e!.mid!} - {e!.time[5]}
              {e!.time[6]} / {e!.time[8]}
              {e!.time[9]} - {e!.data!}
            </p>
            <hr style={{ border: "solid 1px grey" }}></hr>
          </div>
        ))}
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
          placeholder="input"
          style={{ width: "100%", padding: "10px" }}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          style={{
            width: "20%",
            padding: "10px",
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
