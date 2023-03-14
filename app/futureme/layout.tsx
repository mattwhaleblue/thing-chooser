import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-black min-h-screen">{children}</div>;
};

export default Layout;
