import React from "react";

const Layout = ({ children }: React.ComponentProps<"div">) => {
  return <div className="flex justify-center">{children}</div>;
};

export default Layout;
