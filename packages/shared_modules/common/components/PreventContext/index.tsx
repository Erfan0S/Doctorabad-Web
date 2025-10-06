"use client";
import style from "./style.module.scss";

type Porps = {
  clssName?: string;
  zIndex?: number;
  justCoverComponent?: boolean;
};

function PreventContext({ clssName, zIndex, justCoverComponent }: Porps) {
  return (
    <div
      className={`${style.preventContext} ${clssName} ${!justCoverComponent ? style.fullScreen : ""}`}
      onContextMenu={(e) => e.preventDefault()}
      style={{ zIndex }}
    />
  );
}

export default PreventContext;
