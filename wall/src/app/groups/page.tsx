"use client";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import CreateGroup from "../components/createGroup";

export default function Comp() {
  const uid = localStorage.getItem("id");
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/groupinfo/${uid}`
      );
      const groupInfo = await res.json();
      setGroups(groupInfo);
    })();
  }, []);
  return (
    <div>
      <Nav title="Groups" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{width: "80%"}}>
          {groups!.map((e: any) => (
            <div key={e.gid} style={{backgroundColor: "#2bb41e", display: "flex", justifyContent: "center", margin: "5px", padding: "10px", borderRadius: "5px"}}>{e.groupname}</div>
          ))}
        </div>
      </div>
      <CreateGroup />
    </div>
  );
}
