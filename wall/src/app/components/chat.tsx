import { FC } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { decode } from "jsonwebtoken";
import {redirect} from "next/navigation"

interface GMessage {
  gmid: number;
  uid: number;
  name: string;
  gender: string;
  gmessage: string;
  time: string;
}
interface props {
  gmessageArray: Array<GMessage>;
}
const Chat: FC<props> = ({ gmessageArray }) => {
  const createConvo = async (suid: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    interface token {
      uid: number;
    }
    const ruid: number = (decode(localStorage.getItem("token")!)! as token).uid;
    const body = { suid: suid, ruid: ruid };
    await fetch(
      "https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/createconvo", {method: "POST", headers: myHeaders, body: JSON.stringify(body)}
    );
  };
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
          <div
            style={{
              animation: "fadein 0.5s ease-out",
              display: "flex",
              justifyContent:
                localStorage.getItem("name") == e.name
                  ? "flex-end"
                  : "flex-start",
            }}
            key={e.gmid}
          >
            <div
              onClick={() => {
                document
                  .getElementById("hiddenp")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              key={e!.gmid!}
              style={{
                display: "flex",
                padding: "10px",
                fontWeight: "150",
                boxShadow: "0px 0px 6px black",
                borderRadius:
                  localStorage.getItem("name") == e.name
                    ? "25px 25px 0px 25px "
                    : " 25px 25px 25px 0px",
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
                {e.gender == "male" ? <BsGenderMale /> : <BsGenderFemale />}
              </div>
              <p
                onClick={() => {
                  createConvo(e.uid!);
                }}
                style={{
                  fontWeight: "600",
                  padding: "5px",
                  color:
                    localStorage.getItem("name") == e.name
                      ? "grey"
                      : "rgb(200 200 200)",
                }}
              >
                {e.uid} {localStorage.getItem("name") == e.name ? "me" : e.name}
                :
              </p>
              <span style={{ padding: "5px" }}>
                {/* ({e!.time[5]}
                {e!.time[6]}/{e!.time[8]}
                {e!.time[9]})- */}
                <span style={{ fontWeight: "100", padding: "5px" }}>
                  {e!.gmessage!}
                </span>
              </span>
            </div>
          </div>
        ))}
        <p id="hiddenp"></p>
      </div>
    </div>
  );
};
export default Chat;
