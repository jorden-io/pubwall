"use client";
import React, { FC, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
interface Props {
  suid: number;
}
const InPm: FC<Props> = ({ suid }) => {
  const [pms, setPms] = useState([]);
  interface token {
    uid: number;
  }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  const [message, setMessage] = useState("");
    const id: number = (decode(localStorage.getItem("token")!)! as token).uid;
  const subPMessage = async(message: string) =>{
    const body = {suid: id, ruid: suid, message: message};
    await fetch("https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/sendpm", {method: "POST", body: JSON.stringify(body), headers: myHeaders });
  };
  useEffect(() => {
    const body = { suid: suid, ruid: id };
    (async () => {
      const res = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/pmessages/`,
        { method:"POST", body: JSON.stringify(body), headers: myHeaders }
      );
      const pm = await res.json();
      console.log(pm);
      setPms(pm);
    })();
  }, [suid]);
  return (
    <>
      <div>
        <div>
          {pms.map((pm: any) => (
            <>
              <div key={pm.pmid}>{pm.suid} - {pm.message!}</div>
            </>
          ))}
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
              backgroundColor: "lightseagreen",
              fontSize: "16px",
              margin: "10px",
            }}
            onClick={() => {
              setMessage("");
              (document.getElementById("minput") as HTMLInputElement).value =
                "";
              if (message.length > 1) {
                subPMessage(message);
              }
            }}
          >
            send
          </button>
        </div>
        </div>
      </div>
    </>
  );
};
export default InPm;
