import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";

interface props {}
let evenOdd = 0;
const ButtonOptions: FC<props> = () => {
  const borderColor: string = "darkgreen";
  return (
    <>
    <div
      style={{display: "flex", justifyContent: "center"}}
    >

      <BsThreeDots
      style={{color: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!, fontSize: "30px"}}
        onClick={() => {
          evenOdd += 1;
          document.getElementById("boptions")!.style.height = (evenOdd % 2 === 0) ? "100px" : "0px";
        }}
      />
    </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          id="boptions"
          style={{ width: "1000px", height: "0px", transition: "0.5s" }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <button
              style={{
                borderRadius: "5px",
                margin: "5px",
                width: "100%",
                padding: "15px",
                border: "none",
                backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                color: "white",
              }}
            >
              my groups
            </button>
            <button
              style={{
                margin: "5px",
                borderRadius: "5px",
                width: "100%",
                border: "none",
                backgroundColor: (localStorage.getItem("color") ? localStorage.getItem("color") : "cyan")!,
                color: "white",
              }}
            >
              join group
            </button>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <button
              style={{
                borderRadius: "5px",
                margin: "5px",
                width: "100%",
                padding: "10px",
                border: "none",
                backgroundColor: "rgb(50 50 50)",
                color: "white",
              }}
            >
              log out / delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ButtonOptions;
