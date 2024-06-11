import { FC, useState } from "react";
interface props {}
const EnterName: FC<props> = () => {
  const [name, setName] = useState<string>("");
  const subName = (n: string) => {
    if(n.length < 2){
        alert("name too short, must be greater than 2 chars");
        return;
    };
    localStorage.setItem("name", n);
    window.location.reload();
  };
  return (
    <div>
      <h1 style={{display: "flex", justifyContent: "center", fontWeight: "100", margin: "10px"}}> <span style={{color: "#2bb41e" }}>Frog</span>Chats.com</h1>
    <div style={{marginTop: "150px", display: "flex", justifyContent: "center"}}>
    <div
      style={{
        backgroundColor: "rgb(15 15 15)",
        border: "solid 2px #2bb41e",
        borderRadius: "10px",
        padding: "80px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0px",
        width: "500px"
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "100" }}>
        enter a name?
      </h1>
      <input
        style={{
          borderRadius: "10px",
          fontSize: "16px",
          textAlign: "center",
          border: "none",
          padding: "15px",
          margin: "5px",
          backgroundColor: "rgb(40 40 40)",
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="froggy . . ."
      ></input>
      <button
        style={{
          borderRadius: "10px",
          padding: "10px",
          margin: "5px",
          backgroundColor: "#2bb41e",
          color: "white",
          border: "none",
        }}
        onClick={() => {
          subName(name);
        }}
      >
        submit name
      </button>
    </div>
    </div>
    </div>
  );
};
export default EnterName;