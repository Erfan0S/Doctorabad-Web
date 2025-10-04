import React from "react";
import { Apps } from "../types/general";

export default function getCurrentAppName() {
  const path = window.location.pathname;
  const app = Object.entries(Apps).find(([key, value]) => {
    return path.startsWith(`/${value}`);
  });
  console.log(app);
  if (app) return app[1];
  return null;
}
