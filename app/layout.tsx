import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" ></link>
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1 }}>{children}</main>
        <footer className="site-footer">
          {"Designed & Created by "}
          <a
            href="https://in.linkedin.com/in/suraj-parkash-mandhan-556a61246"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suraj Parkash
          </a>
        </footer>
      </body>
    </html>
  );
}
