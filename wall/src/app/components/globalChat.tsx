import { FC } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

interface GMessage {
  mid: number;
  name: string;
  data: string;
  gender: string;
  time: string;
}
interface props {
  gmessageArray: Array<GMessage>;
}
const GlobalChat: FC<props> = ({ gmessageArray }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <div
        style={{
          width: "1000px",
          backgroundColor: "rgb(45 45 45)",
          boxShadow: "inset 0px 0px 8px black",
          height: "350px",
          margin: "0px",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {gmessageArray.map((e: GMessage) => (
          <div key={e.mid}>
            <div
              onClick={() => {
                document
                  .getElementById("hiddenp")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              key={e!.mid!}
              style={{
                display: "flex",
                padding: "10px",
                fontWeight: "150",
              }}
            >
              <div
                style={
                  e.gender != "male"
                    ? {
                        margin: "2px",
                        width: "30px",
                        height: "30px",
                        fontSize: "20px",
                        padding: "5px",
                        // border: "solid 1px blue",
                        borderRadius: "500px",
                        backgroundColor: "lightblue",
                      }
                    : {
                        margin: "0px",
                        width: "30px",
                        height: "30px",
                        fontSize: "20px",
                        padding: "5px",
                        borderRadius: "500px",
                        backgroundColor: "pink",
                      }
                }
              >
                {e.gender != "male" ? <BsGenderMale /> : <BsGenderFemale />}
              </div>
              <p
                style={{
                  padding: "5px",
                  color:
                    localStorage.getItem("name") == e.name
                      ? "#2bb41e"
                      : "white",
                }}
              >
                {localStorage.getItem("name") == e.name ? "me" : e.name}
              </p>
              <span style={{ padding: "5px" }}>
                ({e!.time[5]}
                {e!.time[6]}/{e!.time[8]}
                {e!.time[9]})-
                <span style={{ fontWeight: "600" }}> {e!.data!}</span>
              </span>
            </div>
            <hr style={{ border: "solid 1px rgb(80 80 80)" }}></hr>
          </div>
        ))}
        <p id="hiddenp"></p>
      </div>
    </div>
  );
};
export default GlobalChat;
