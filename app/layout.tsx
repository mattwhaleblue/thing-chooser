import "./globals.css";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-slate-800 text-white min-h-screen">{children}</body>
    </html>
  );
};

export default Layout;
