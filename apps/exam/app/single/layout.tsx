import React from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default singleLayout;
