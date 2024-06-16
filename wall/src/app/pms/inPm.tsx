"use client";
import React, { FC, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
interface Props {
  pcmid: number;
  suid: number;
  name: string;
}
const InPm: FC<Props> = ({ pcmid, suid, name }) => {
  const [pms, setPms] = useState([]);
  const [message, setMessage] = useState("");
  interface token {
    uid: number;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const id: number = (decode(localStorage.getItem("token")!)! as token).uid;
  const subPMessage = async (message: string) => {
    const body = { pcmid: pcmid, suid: id, ruid: suid, message: message };
    await fetch(
      "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/sendpm",
      { method: "POST", body: JSON.stringify(body), headers: myHeaders }
    );
  };
  useEffect(() => {
    const body = { suid: suid, ruid: id };
    (async () => {
      const res = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/pmessages/`,
        { method: "POST", body: JSON.stringify(body), headers: myHeaders }
      );
      const pm = await res.json();
      console.log(pm);
      setPms(pm);
    })();
  }, [suid]);
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <div
            style={{
              width: "1000px",
              backgroundColor: "rgb(45 45 45)",
              boxShadow: "inset 0px 0px 8px black",
              height: "350px",
              margin: "0px",
              overflowY: "scroll",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {pms.map((e: any) => (
              <div
                style={{
                  animation: "fadein 0.5s ease-out",
                  display: "flex",
                  justifyContent: id != e.ruid ? "flex-end" : "flex-start",
                }}
                key={e.gmid}
              >
                <div
                  onClick={() => {
                    document
                      .getElementById("hiddenp")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  key={e!.gmid!}
                  style={{
                    display: "flex",
                    padding: "10px",
                    fontWeight: "150",
                    boxShadow: "0px 0px 6px black",
                    borderRadius:
                      id != e.ruid
                        ? "25px 25px 0px 25px "
                        : " 25px 25px 25px 0px",
                    backgroundColor: "rgb(30 30 30)",
                    margin: "10px",
                  }}
                >
                  <div
                    style={
                      e.gender == "male"
                        ? {
                            margin: "2px",
                            width: "30px",
                            height: "30px",
                            fontSize: "20px",
                            padding: "5px",
                            // border: "solid 1px blue",
                            borderRadius: "500px",
                            backgroundColor: "lightblue",
                          }
                        : {
                            margin: "0px",
                            width: "30px",
                            height: "30px",
                            fontSize: "20px",
                            padding: "5px",
                            borderRadius: "500px",
                            backgroundColor: "pink",
                          }
                    }
                  >
                    {e.gender == "male" ? <BsGenderMale /> : <BsGenderFemale />}
                  </div>
                  <p
                    // onClick={() => {
                    //   createConvo(e.uid!);
                    // }}
                    style={{
                      fontWeight: "600",
                      padding: "5px",
                      color:
                      id != e.ruid 
                          ? "grey"
                          : "rgb(200 200 200)",
                    }}
                  >
                    {/* {e.suid}{" "} */}
                    {localStorage.getItem("name") == e.name ? "me" : e.name}
                  </p>
                  <span style={{ padding: "5px" }}>
                {id != e.ruid ?  "me": name}:
                    {/* ({e!.time[5]}
                {e!.time[6]}/{e!.time[8]}
                {e!.time[9]})- */}
                    <span style={{ fontWeight: "100", padding: "5px" }}>
                      {e!.message!}
                    </span>
                  </span>
                </div>
              </div>
            ))}
            <p id="hiddenp"></p>
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
        {/* <div>
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
        </div> */}
      </div>
    </>
  );
};
export default InPm;
