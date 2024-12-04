import { FC } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

interface GMessage {
  mid: number;
  name: string;
  data: string;
  gender: string;
  time: string;
  url: string;
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
          border: "none",
          // background: "linear-gradient(0.50turn, rgb( 10 10 10), rgb(30 30 30), rgb( 10 10 10))",
          width: "1000px",
          backgroundColor: "rgb( 45 45 45)",
          // boxShadow: "inset 0px 0px 50px black",
          height: "350px",
          margin: "0px",
          borderRadius: "2px",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {gmessageArray.map((e: GMessage) => (
          <div style={{animation: "fadein 0.5s ease-out", display: "flex", justifyContent: localStorage.getItem("name") == e.name ? "flex-end" : "flex-start"} } key={e.mid}>
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
                boxShadow: "0px 0px 6px black",
                // border: "solid 1px grey",
                borderRadius: localStorage.getItem("name") == e.name ? "25px 25px 0px 25px ": " 25px 25px 25px 0px",
                backgroundColor: "rgb(30 30 30)",
                margin: "10px",
              }}
            >
              <div
                style={
                  e.gender == "male"
                    ? {
                        margin: "2px",
                        width: "30px",
                        height: "30px",
                        fontSize: "20px",
                        padding: "5px",
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
                {e.gender == "male" ? <BsGenderMale /> : <BsGenderFemale />}
              </div>
              <p
                style={{
                  fontWeight: "600",
                  padding: "5px",
                  color:
                    localStorage.getItem("name") == e.name
                      ? "grey"
                      : "rgb(200 200 200)",
                }}
              >
                {localStorage.getItem("name") == e.name ? "me" : e.name}:
              </p>
              <span style={{ padding: "5px", fontWeight: "500" }}>
                {/* ({e!.time[5]}
                {e!.time[6]}/{e!.time[8]}
                {e!.time[9]}) */}
                <span style={{ fontWeight: "200" }}> {e!.data!}</span>
              </span>
              <img width={300} src={e?.url}/>
            </div>
            {/* <hr style={{ border: "solid 1px rgb(80 80 80)" }}></hr> */}
          </div>
        ))}
        <p id="hiddenp"></p>
      </div>
    </div>
  );
};
export default GlobalChat;
