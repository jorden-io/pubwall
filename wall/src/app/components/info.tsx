import { FC, useEffect } from "react";
interface props {}
const Info: FC<props> = () => {
  useEffect(() => {
    document.getElementById("message-page")!.style!.filter = "blur(3px)";
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <h2 style={{marginTop: "50px", fontWeight: "100"}}>if demands comes ill add more features</h2>
          <h2 style={{fontWeight: "100"}}>if demands comes ill add more features</h2>
        </div>
      </div>
    </div>
  );
};

export default Info;
