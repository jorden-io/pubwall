import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Info from "./components/info";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrogChats",
  description: "ribbit in groups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Info />
        {children}
        </body>
    </html>
  );
}
