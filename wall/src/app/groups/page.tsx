"use client";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import { decode } from "jsonwebtoken";
import CreateGroup from "../components/createGroup";
import InGroup from "../ingroup/inGroup";

export default function Comp() {
  const [inGroup, setInGroup] = useState<boolean>(false);
  const [groups, setGroups] = useState([]);
  const [creator, setCreator] = useState<string>("");
  const [gdescription, setDescription] = useState<string>("");
  const [globalGroups, setGlobalGroups] = useState([]);
  const [groupNumber, setGroupNumber] = useState<number>(0);
  const [grouName, setGroupName] = useState<string>("");
  interface token {
    uid: number;
  }
  useEffect(() => {
    const t = (decode(localStorage.getItem("token")!) as token).uid;
    (async () => {
      // const res = await fetch(
      //   `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/groupinfo/${t}`
      // );
      // const groupInfo = await res.json();
      // setGroups(groupInfo);
      const gres = await fetch(
        `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/allgroups/`
      );
      const globalGroups = await gres.json();
      setGlobalGroups(globalGroups);
    })();
  }, []);
  if (inGroup) {
    return (
      <>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{width: "1000px", margin: "10px"}}>
        <button style={{ borderRadius: "5px", backgroundColor: "orange", width: "100%", padding: "10px", color: "white", border: "none"}} onClick={() => setInGroup(false)}>exit group</button>
        </div>
      </div>
        <InGroup gid={groupNumber!} groupname={grouName} name={creator} description={gdescription} />
      </>
    );
  } else {
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
                marginBottom: "15px",
              }}
            >
              global groups
            </h2>
            <div
              style={{
                backgroundColor: "rgb(40 40 40)",
                height: "200px",
                overflowY: "scroll",
                width: "100%",
              }}
            >
              {globalGroups.map((e: any) => (
                <div
                  key={e.gid}
                  style={{
                    display: "flex",
                    padding: "10px",
                    backgroundColor: "#2bb41e",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <p style={{ width: "100%", padding: "10px" }}>
                    {e.groupname}{" "}
                  </p>{" "}
                  <button
                    onClick={() => {
                      setGroupNumber(e.gid);
                      setGroupName(e.groupname);
                      setCreator(e.name);
                      setDescription(e.description);
                      setInGroup(true);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h2 style={{display: "flex", justifyContent: "center", margin: "5px", fontWeight: "100"}}>create group</h2>
        <CreateGroup />
      </div>
    );
  }
}
