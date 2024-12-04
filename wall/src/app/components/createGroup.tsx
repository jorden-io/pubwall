import { FC, useState } from "react";
import { decode } from "jsonwebtoken";

const CreateGroup: FC = () => {
  interface token {
    uid: number;
  }
  const [groupName, setGroupName] = useState<string>();
  const [des, setDes] = useState<string>("");
  const subGroup = async (groupname: string, description: string) => {
    const uid = (decode(localStorage.getItem("token")!) as token).uid;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { uid: uid, groupname, description: description };
    await fetch(
      `https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/creategroup/`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    window.location.reload();
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "1000px", margin: "10px" }}>
        <div style={{ display: "flex" }}>
          <input
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              color: "white",
              marginBottom: "5px",
              marginRight: "2.5px",
              backgroundColor: "rgb(80 80 80)",
              borderRadius: "5px",
            }}
            placeholder="grouname . . ."
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          ></input>
          <input
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              marginLeft: "2.5px",
              marginBottom: "5px",
              color: "white",
              backgroundColor: "rgb(80 80 80)",
              borderRadius: "5px",
            }}
            placeholder="description . . ."
            onChange={(e) => {
              setDes(e.target.value);
            }}
          ></input>
        </div>
        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
            color: "white",
          }}
          onClick={() => {
            subGroup(groupName!, des);
          }}
        >
          create
        </button>
      </div>
    </div>
  );
};
export default CreateGroup;
