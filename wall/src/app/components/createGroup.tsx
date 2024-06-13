import { FC, useState } from "react";

const CreateGroup: FC = () => {
  const [groupName, setGroupName] = useState<string>();
  const subGroup = async (groupname: string) => {
    const uid = localStorage.getItem("id");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = { uid: uid, groupname };
    await fetch(
      `https://fr48rz56nh.execute-api.us-east-2.amazonaws.com/api/creategroup/`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    window.location.reload();
  };
  return (
    <div>
      <input
        placeholder="grouname"
        onChange={(e) => {
          setGroupName(e.target.value);
        }}
      ></input>
      <p>{groupName}</p>
      <button
        onClick={() => {
          subGroup(groupName!);
        }}
      >
        create
      </button>
    </div>
  );
};
export default CreateGroup;
