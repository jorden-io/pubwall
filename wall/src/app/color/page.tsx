"use client";
import React, { FC, useState } from "react";
import Nav from "../components/nav";
interface Props {}
const Color: FC<Props> = () => {
  const [color, setColor] = useState("");
  return (
    <>
      <div>
        <Nav title="change color" />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <span
            onClick={() => {
              setColor("pink");
              localStorage.setItem("color", "pink");
            }}
            style={{ backgroundColor: "pink", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("cyan");
              localStorage.setItem("color", "cyan");
            }}
            style={{ backgroundColor: "cyan", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#990011");
              localStorage.setItem("color", "#990011");
            }}
            style={{ backgroundColor: "#990011", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#2C5F2D");
              localStorage.setItem("color", "#2C5F2D");
            }}
            style={{ backgroundColor: "#2C5F2D", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#FB6542");
              localStorage.setItem("color", "#FB6542");
            }}
            style={{ backgroundColor: "#FB6542", padding: "20px" }}
          ></span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
          <span
            onClick={() => {
              setColor("#FFBB00");
              localStorage.setItem("color", "#FFBB00");
            }}
            style={{ backgroundColor: "#FFBB00", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#CEE6F2");
              localStorage.setItem("color", " #CEE6F2");
            }}
            style={{ backgroundColor: " #CEE6F2", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#A1D6E2");
              localStorage.setItem("color", "#A1D6E2");
            }}
            style={{ backgroundColor: "#A1D6E2", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#F52549");
              localStorage.setItem("color", "#F52549");
            }}
            style={{ backgroundColor: "#F52549", padding: "20px" }}
          ></span>
          <span
            onClick={() => {
              setColor("#735DA5");
              localStorage.setItem("color", "#735DA5");
            }}
            style={{ backgroundColor: "#735DA5", padding: "20px" }}
          ></span>
        </div>
      </div>
    </>
  );
};
export default Color;
