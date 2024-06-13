import Link from "next/link";
import { FC } from "react";
import { FaBars } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
interface props {
  title: string;
}
const Nav: FC<props> = ({ title }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FaBars
        onClick={() => {
          document.getElementById("info")!.style.display = "block";
        }}
        style={{
          fontSize: "25px",
          margin: "20px",
          color: "orange",
        }}
      />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "100",
          margin: "20px",
        }}
      >
        {title}
      </h1>
      <Link href={"/"}>
        <FaEarthAmericas
          style={{ fontSize: "25px", margin: "20px", color: "#2bb41e" }}
        />
      </Link>
    </div>
  );
};
export default Nav;
