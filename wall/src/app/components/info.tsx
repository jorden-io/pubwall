"use client";
import Link from "next/link";
import { FC, useEffect } from "react";
import { IoClose } from "react-icons/io5";
interface props {}
const Info: FC<props> = () => {
  useEffect(() => {}, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        id="info"
        style={{
          display: "none",
          animation: "fadein 0.5s ease-out",
          backgroundColor: "rgb( 40 40 40 )",
          zIndex: "1000",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", margin: "8px" }}>

            <IoClose
              style={{
                color: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                border: "none",
                //boxShadow: "0px 0px 6px black",
                padding: "5px",
                backgroundColor: "rgb( 30 30 30)",
                width: "85%",
                borderRadius: "5px",
                fontSize: "40px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              onClick={() => {
                document.getElementById("info")!.style.display = "none";
              }}
            />

          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <h2 style={{fontWeight: "400", margin: "10px", color: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!}}> <a href="/color">change color</a> </h2>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
          <hr style={{ border: "solid 1px rgb(30 30 30)", borderRadius: "100px", width: "85%" }}></hr>
          </div>
          <Link
            onClick={() => {
              setTimeout(() => {
                document.getElementById("info")!.style.display = "none";
              }, 300);
            }}
            href={"/groups"}
          >
            <h2
              style={{
                marginTop: "20px",
                fontWeight: "100",
                display: "flex",
                justifyContent: "center",
              }}
            >
              global groups
            </h2>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                document.getElementById("info")!.style.display = "none";
              }, 300);
            }}
            href={"/groups"}
          >
            <h2
              style={{
                marginTop: "20px",
                fontWeight: "100",
                display: "flex",
                justifyContent: "center",
              }}
            >
              my groups
            </h2>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                document.getElementById("info")!.style.display = "none";
              }, 300);
            }}
            href={"/pms"}
          >
            <h2
              style={{
                marginTop: "20px",
                fontWeight: "100",
                display: "flex",
                justifyContent: "center",
              }}
            >
             private chats
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
