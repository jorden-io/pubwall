"use client";
import React, { FC, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { RSCPathnameNormalizer } from "next/dist/server/future/normalizers/request/rsc";
import Nav from "../components/nav";
import InPm from "./inPm";
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
  useEffect(() => {
    interface token {
      uid: number;
    }
    const id: number = (decode(localStorage.getItem("token")!)! as token).uid;
    (async () => {
      const res = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/myconversations/${id}`
      );
      const convos = await res.json();
      setConversations(convos);
    })();
  }, []);
  if (inPm) {
    return (
      <div>
        <Nav title="messaging: " />
        <InPm suid={suid!} pcmid={pcmid!}  />
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
                key={c.pcmid}
                onClick={() => {
                  setSuid(c.suid!);
                  setPcmid(c.pcmid!);
                  setInPm(true);
                }}
              >
               {c.suid!}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};
export default Comp;
