import { FC } from "react";

const Loading: FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", filter: "blur(0px)",height: "100%" }}>
      <div style={{ boxShadow: "0px 0px 15px cyan", margin: "20px", marginTop: "200px", borderRadius: "5px" }}>
        <h1
          style={{
            fontWeight: "100",
            // marginTop: "200px",
            color: "white",
            boxShadow: "inset 0px 0px 25px cyan",
            padding: "30px",
            borderRadius: "5px",
            backgroundColor: "indigo",
            border: "solid 1px cyan",
          }}
        >
          loading . . .
        </h1>
      </div>
    </div>
  );
};
export default Loading;
