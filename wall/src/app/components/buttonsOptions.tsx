import { FC } from "react";

interface props {}
const ButtonOptions: FC<props> = () => {
  const borderColor: string = "darkgreen";
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "1000px" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            style={{
              borderRadius: "5px",
              margin: "5px",
              width: "100%",
              padding: "15px",
              //border: `solid 2px ${borderColor}`,
              border: "none",
              backgroundColor: "#2bb41e",
              color: "white",
            }}
          >
            create group
          </button>
          <button
            style={{
              margin: "5px",
              borderRadius: "5px",
              width: "100%",
              border: "none",
              backgroundColor: "#2bb41e",
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
              backgroundColor: "orange",
              color: "white",
            }}
          >
            log out / delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ButtonOptions;
