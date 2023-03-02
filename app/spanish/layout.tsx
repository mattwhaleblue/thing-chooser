import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center">{children}</div>;
};

export default Layout;
