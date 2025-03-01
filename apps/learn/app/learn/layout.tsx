import React from "react";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="learn-container">
      {children} <MobileNavBar />
    </div>
  );
};

export default layout;
