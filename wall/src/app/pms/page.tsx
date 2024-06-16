"use client";
import React, { FC, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { RSCPathnameNormalizer } from "next/dist/server/future/normalizers/request/rsc";
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
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/myconversations/${id}`,
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
                color: "white",
                backgroundColor: "grey",
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
        <div>
          <div>
            {conversations.map((c: any) => (
              <div
                style={{
                  boxShadow: "0px 0px 4px black",
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
                        color: "lightseagreen",
                        position: "relative",
                        float: "right",
                      }}
                    />
                  }
                  {
                    <FaUser
                      style={{
                        color: "lightseagreen",
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
