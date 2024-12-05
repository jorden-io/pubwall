"use client";
import React, { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Nav from "../components/nav";
import InPm from "./inPm";
import { FaTrash, FaUser } from "react-icons/fa";
interface C {
  pcmid: number;
  suid: number;
  ruid: number;
}
const Comp = () => {
  const [conversations, setConversations] = useState([]);
  const [suid, setSuid] = useState<number>();
  const [pcmid, setPcmid] = useState<number>();
  const [inPm, setInPm] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  useEffect(() => {
    interface token {
      uid: number;
    }
    const id: number = (decode(localStorage.getItem("token")!)! as token).uid;
    (async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = { token: localStorage.getItem("token") };
      const res = await fetch(
        `https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/myconversations/${id}`,
        { method: "POST", headers: myHeaders, body: JSON.stringify(body) }
      );
      const convos = await res.json();
      setConversations(convos);
    })();
  }, []);
  if (inPm) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "1000px", margin: "5px" }}>
            <button
              onClick={() => {
                setInPm(false);
              }}
              style={{
                width: "100%",
                padding: "10px",
                color: "grey",
                backgroundColor: "rgb( 40 40 40)",
                border: "none",
                borderRadius: "5px",
              }}
            >
              exit
            </button>
          </div>
        </div>
        <Nav title={` ${name} `} />
        <InPm suid={suid!} pcmid={pcmid!} name={name!} />
      </div>
    );
  } else {
    return (
      <>
        <Nav title="my conversations" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "1000px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  marginRight: "5px",
                  marginLeft: "5px",
                  padding: "10px",
                  // backgroundColor: "rgb( 30 30 30)",
                  backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                  border: "none",
                  borderRadius: "5px",
                  color: "whitesmoke",
                }}
              >
                delete all
              </button>
              <button
                style={{
                  width: "100%",
                  marginLeft: "5px",
                  marginRight: "5px",
                  padding: "10px",
                  // backgroundColor: "rgb(30 30 30)",
                  backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                  border: "none",
                  borderRadius: "5px",
                  color: "whitesmoke",
                }}
              >
                erase all
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                placeholder="search user . . ."
                style={{
                  backgroundColor: "rgb(30 30 30)",
                  margin: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  border: "none",
                  padding: "10px",
                }}
              ></input>
            </div>
            {conversations.map((c: any) => (
              <div
                style={{
                  // boxShadow: "0px 0px 2px black",
                  backgroundColor: "rgb(42 42 42)",
                  margin: "20px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                key={c.pcmid}
                onClick={() => {
                  setSuid(c.suid!);
                  setPcmid(c.pcmid!);
                  setName(c.name!);
                  setInPm(true);
                }}
              >
                <p style={{ fontWeight: "100" }}>
                  {c.name!}{" "}
                  {
                    <FaTrash
                      style={{
                        marginLeft: "20px",
                        color: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                        position: "relative",
                        float: "right",
                      }}
                    />
                  }
                  {
                    <FaUser
                      style={{
                        color: "grey",
                        position: "relative",
                        float: "right",
                      }}
                    />
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};
export default Comp;
