"use client";
import { FC, useEffect, useState } from "react";
import Nav from "../components/nav";
import { decode } from "jsonwebtoken";
import CreateGroup from "../components/createGroup";
import InGroup from "../ingroup/inGroup";
import EnterName from "../components/name";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

let t = 0;
export default function Comp() {
  interface groupInfo {
    creator: string;
    description: string;
    groupname: string;
    groupnumber: number;
  }
  const GroupInfo: FC<groupInfo> = ({
    creator,
    description,
    groupname,
    groupnumber,
  }) => {
    const [groupMembers, setGroupMembers] = useState([]);
    useEffect(() => {
      (async () => {
        const res = await fetch(
          `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/groupmembers/${groupnumber}`
        );
        const gms = await res.json();
        setGroupMembers(gms);
      })();
    }, [groupNumber]);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            animation: "fadein 0.5s ease-out",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(40 40 40)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "1000px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <button
                onClick={() => {
                  setShowInfo(false);
                }}
                style={{
                  border: "none",
                  fontWeight: "100",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px",
                  backgroundColor: "orange",
                  color: "white",
                }}
              >
                {" "}
                close info
              </button>
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  fontSize: "60px",
                }}
              >
                {groupname}
              </h1>
              <p style={{ textAlign: "center", fontWeight: "100" }}>
                {" "}
                creator-
                <span style={{ fontWeight: "400", color: "orange" }}>
                  {creator}
                </span>
              </p>
              <div
                style={{
                  backgroundColor: "rgb(20 20 20)",
                  margin: "10px",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "100",
                    margin: "10px",
                  }}
                >
                  description
                </h2>
                <div></div>
                <p style={{ margin: "10px", textAlign: "center" }}>
                  {description}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(20 20 20)",
                  height: "300px",
                  overflowY: "scroll",
                  margin: "10px",
                  borderRadius: "5px",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "100",
                    margin: "10px",
                  }}
                >
                  members - {groupMembers.length}
                </h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <hr
                    style={{
                      border: "solid 1px grey",
                      width: "90%",
                      borderRadius: "1000px",
                    }}
                  ></hr>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {groupMembers.map((m: any) => (
                    <div
                    key={m.gid}
                      style={{
                        margin: "20px",
                        border: "solid 1px grey",
                        width: "100%",
                        textAlign: "center",
                        padding: "15px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px"
                      }}
                    >
                        {m.gender == "male" ? (
                          <BsGenderMale style={{margin: '10px', fontSize: "23px",}} />
                        ) : (
                          <BsGenderFemale />
                        )}
                      <p style={{ fontSize: "30px", fontWeight: "100", marginLeft: "20px",}}>{m.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div style={{backgroundColor: "black", margin: "10px", borderRadius: "5px", padding: "10px"}}>
                <h2 style={{display: "flex", justifyContent: "center", fontWeight: "100", margin: "10px"}}>members</h2>
                <div style={{display: "flex", justifyContent: "center"}}>
                <hr style={{border: "solid 1px grey", width: "90%",borderRadius: "1000px"}}></hr>
                </div>
                <div>

                </div>
              <p style={{margin: "10px", textAlign: "center"}}>{description}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const [inGroup, setInGroup] = useState<boolean>(false);
  const [groups, setGroups] = useState([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [creator, setCreator] = useState<string>("");
  const [gdescription, setDescription] = useState<string>("");
  const [globalGroups, setGlobalGroups] = useState([]);
  const [groupNumber, setGroupNumber] = useState<number>(0);
  const [grouName, setGroupName] = useState<string>("");
  interface token {
    uid: number;
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      t = (decode(localStorage.getItem("token")!) as token).uid;
    }
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "1000px", margin: "10px" }}>
            <button
              style={{
                borderRadius: "5px",
                backgroundColor: "orange",
                width: "100%",
                padding: "10px",
                color: "white",
                border: "none",
              }}
              onClick={() => setInGroup(false)}
            >
              exit group
            </button>
          </div>
        </div>
        <InGroup
          gid={groupNumber!}
          groupname={grouName}
          name={creator}
          description={gdescription}
        />
      </>
    );
  }
  if (showInfo) {
    return (
      <GroupInfo
        creator={creator}
        description={gdescription}
        groupname={grouName}
        groupnumber={groupNumber}
      />
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
                    {e.name} - ({e.groupname}){" "}
                  </p>{" "}
                  <button
                    onClick={() => {
                      setGroupNumber(e.gid);
                      setGroupName(e.groupname);
                      setCreator(e.name);
                      setDescription(e.description);
                      setInGroup(false);
                      setShowInfo(true);
                    }}
                    style={{
                      width: "50%",
                      padding: "10px",
                      backgroundColor: "rgb(60 60 60)",
                      fontWeight: "1000",
                      fontSize: "16px",
                      color: "white",
                      border: "none",
                      borderRadius: "8px 0px 0px 8px",
                      marginRight: "3px",
                    }}
                  >
                    info
                  </button>
                  <button
                    onClick={() => {
                      setGroupNumber(e.gid);
                      setGroupName(e.groupname);
                      setCreator(e.name);
                      setDescription(e.description);
                      setInGroup(true);
                      setShowInfo(false);
                    }}
                    style={{
                      width: "50%",
                      padding: "10px",
                      backgroundColor: "darkgreen",
                      fontWeight: "1000",
                      fontSize: "16px",
                      color: "white",
                      border: "none",
                      borderRadius: "0px 8px 8px 0px",
                    }}
                  >
                    join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px",
            fontWeight: "100",
          }}
        >
          create group
        </h2>
        <CreateGroup />
      </div>
    );
  }
}
