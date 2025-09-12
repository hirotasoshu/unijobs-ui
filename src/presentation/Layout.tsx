import React from "react";
import MainAppBar from "./components/MainAppBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <MainAppBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
