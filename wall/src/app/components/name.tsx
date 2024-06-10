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
    <div style={{marginTop: "150px"}}>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0px",
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "100" }}>
        input name to enter
      </h1>
      <input
        style={{
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
        placeholder="name..."
      ></input>
      <button
        style={{
          padding: "10px",
          margin: "5px",
          backgroundColor: "lightseagreen",
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
  );
};
export default EnterName;