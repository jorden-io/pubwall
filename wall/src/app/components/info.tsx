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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IoClose
              style={{
                color: "lightseagreen",
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
          <hr style={{ border: "solid 1px grey", borderRadius: "100px", width: "85%" }}></hr>
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
