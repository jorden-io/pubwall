"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { decode } from "jsonwebtoken";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
interface Props {
  pcmid: number;
  suid: number;
  name: string;
}
let time = 0;
let currentlyRunning = false;
let threeTries = 0;
const InPm: FC<Props> = ({ pcmid, suid, name }) => {
  const [pms, setPms] = useState([]);
  const [message, setMessage] = useState("");
  interface token {
    uid: number;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const id: number = (decode(localStorage.getItem("token")!)! as token).uid;
  const fetchMessages = async () => {
    const body = { suid: suid, ruid: id, token: localStorage.getItem("token") };
    const res = await fetch(
      `https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/pmessages/`,
      { method: "POST", body: JSON.stringify(body), headers: myHeaders }
    );
    const pm = await res.json();
    setPms(pm);
  };
  const subPMessage = async (message: string) => {
let burl = "";
    let file = inputFileRef?.current?.files![0];
    if(file){
    const newBlob = await upload(file.name ? file.name : "", file ? file : "", {
      access: "public",
      handleUploadUrl: "/api/avatar/upload",
    });
    setBlob(newBlob);
    burl = newBlob.url;
    };
    const body = {
      pcmid: pcmid,
      suid: id,
      ruid: suid,
      message: message,
      token: localStorage.getItem("token"),
      url: burl,
    };
    await fetch(
      "https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/sendpm",
      { method: "POST", body: JSON.stringify(body), headers: myHeaders }
    );
    fetchMessages().then(() => {
      document
        .getElementById("hiddenp")
        ?.scrollIntoView({ behavior: "smooth" });
    });
    if (currentlyRunning === false) {
      currentlyRunning = true;
      const pollingInterval = setInterval(() => {
        fetchMessages().then(() => {
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
    file = undefined;
    burl = "";
  };
  useEffect(() => {
    const body = { suid: suid, ruid: id, token: localStorage.getItem("token") };
    (async () => {
      const res = await fetch(
        `https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/pmessages/`,
        { method: "POST", body: JSON.stringify(body), headers: myHeaders }
      );
      const pm = await res.json();
      setPms(pm);
      setInterval(() => {
        if (threeTries <= 4) {
          if (!currentlyRunning) {
            console.log("from pm 10");
            fetchMessages();
            document
              .getElementById("hiddenp")
              ?.scrollIntoView({ behavior: "smooth" });
            threeTries += 1;
          }
        }
      }, 10000);
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
                key={e.pmid}
              >
                <div
                  onClick={() => {
                    document
                      .getElementById("hiddenp")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  key={e!.gmid!}
                  style={{
                    display: "grid",
                    padding: "10px",
                    fontWeight: "150",
                    //boxShadow: "0px 0px 6px black",
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
                        gap: "20px",
                        display: "flex",
                          }
                        : {
                            margin: "0px",
                            width: "30px",
                            height: "30px",
                            fontSize: "20px",
                            padding: "5px",
                            borderRadius: "500px",
                            backgroundColor: "pink",
                        gap: "20px",
                        display: "flex",
                          }
                    }
                  >
                    <p>
                    {e.gender == "male" ? <BsGenderMale /> : <BsGenderFemale />}
                    </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: id != e.ruid ? "grey" : "rgb(200 200 200)",
                    }}
                  >
                    {/* {localStorage.getItem("name") == name ? "me" : name} */}
                    {id != e.ruid ? "me" : name}
                  </p>
                  </div>
              <hr
                style={{
                  border: "solid 1px rgb(25 25 25)",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              ></hr>
                  <span style={{ padding: "5px", fontWeight: "600", maxWidth: "300px", textAlign: "center", width: "250px" }}>
                    {/* {id != e.ruid ? "me" : name}: */}
                    {/* ({e!.time[5]}
                {e!.time[6]}/{e!.time[8]}
                {e!.time[9]})- */}
                    <span style={{ fontWeight: "100", padding: "5px" }}>
                      {e!.message!}
                    </span>
                  </span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {e.url ? (
                  <img
                    style={{ borderRadius: "10px" }}
                    width={200}
                    src={e?.url}
                  />
                ) : (
                  ""
                )}
              </div>
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
              flexDirection: "column",

              position: "fixed",
              width: "100%",
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
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "100px",
              }}
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
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                  (
                    document.getElementById("minput") as HTMLInputElement
                  ).value = "";
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
