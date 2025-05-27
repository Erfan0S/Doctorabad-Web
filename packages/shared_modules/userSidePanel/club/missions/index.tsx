import React from "react";
import MissionsItem from "./MissionsItem";

export default function Missions() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <MissionsItem />
      ))}
    </div>
  );
}
