"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Info from "./components/info";
import { useEffect, useState, Suspense } from "react";
import { verify, decode } from "jsonwebtoken";
import EnterName from "./components/name";
import Loading from "./components/loading";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "FrogChats",
//   description: "ribbit in groups",
// };

interface token {
  uid: number;
}
interface UserInfo {
  uid: number;
  name: string;
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [finished, setFinished] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const t: string = localStorage.getItem("token")!;
        try {
          if (verify(t!, "bia")) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = { token: localStorage.getItem("token") };
            const res = await fetch(
              `https://jktecbt034.execute-api.us-east-2.amazonaws.com/api/userinfo/${
                (decode(t) as token).uid
              }`,
              { method: "POST", headers: myHeaders, body: JSON.stringify(body) }
            );
            const user = await res.json();
            localStorage.setItem("gender", user[0].gender);
            if (
              user[0].name === localStorage.getItem("name") &&
              user[0].uid === (decode(t) as token).uid
            ) {
              console.log("authenciated");
              setAuthenticated(true);
            }
          }
        } catch (err) {
          setFinished(true);
          setAuthenticated(false);
        }
      }
      setFinished(true);
    })();
    setLoading(false);
  }, []);
  if (authenticated && !loading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Info />
          {children}
        </body>
      </html>
    );
  }
  if (loading || !finished) {
    return (
      <html lang="en">
        <body className={inter.className}>
          {/* {(loading) ? <Loading /> : <EnterName />} */}
          <Loading />
        </body>
      </html>
    );
  }
  if (!authenticated && !loading && finished) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <EnterName />
        </body>
      </html>
    );
  }
}
