import type { Metadata } from "next";
import "./globals.css";
import Gnb from "../components/gnb";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
  icons: {
    icon: "/imgs/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Gnb />
        <div className="mx-auto min-h-[calc(100vh-60px)] bg-gray-50">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
