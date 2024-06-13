"use client";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import CreateGroup from "../components/createGroup";

export default function Comp() {
  const [groups, setGroups] = useState([]);
  const [globalGroups, setGlobalGroups] = useState([]);
  useEffect(() => {
    const uid = localStorage.getItem("id");
    (async () => {
      const res = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/groupinfo/${uid}`
      );
      const groupInfo = await res.json();
      setGroups(groupInfo);
      const gres = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/allgroups/`
      );
      const globalGroups = await gres.json();
      setGlobalGroups(globalGroups);
    })();
  }, []);
  return (
    <div>
      <Nav title="Groups" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          {groups!.map((e: any) => (
            <div
              key={e.gid}
              style={{
                backgroundColor: "#2bb41e",
                display: "flex",
                justifyContent: "center",
                margin: "5px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {e.groupname}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "1000px" }}>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "100",
              marginBottom: "15px"
            }}
          >
            global groups
          </h2>
          <div
            style={{
              borderTop: "solid 1px green",
              height: "200px",
              overflowY: "scroll",
              width: "100%",
              borderBottom: "solid 1px green",
            }}
          >
            {globalGroups.map((e: any) => (
              <div key={e.gid}  style={{display: "flex", padding: "10px", backgroundColor: "#2bb41e", margin: "5px", borderRadius: "5px"}}>
                {" "}
                <p style={{width: "100%", padding: "10px"}}>{e.groupname} </p>{" "}
                <button style={{width: "100%", padding: "10px", backgroundColor: "orange", color: "white", border: "none", borderRadius: "5px"}}>join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <h2>my groups</h2>
      <CreateGroup /> */}
    </div>
  );
}
