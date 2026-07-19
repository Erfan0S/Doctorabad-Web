"use client";

type Porps = {
  clssName?: string;
  zIndex?: number;
  justCoverComponent?: boolean;
};

function PreventContext({ clssName, zIndex, justCoverComponent }: Porps) {
  return (
    <div
      className={`absolute left-0 top-0 z-0 h-full w-full ${clssName} ${!justCoverComponent ? "!fixed !h-screen !w-screen" : ""}`}
      onContextMenu={(e) => e.preventDefault()}
      style={{ zIndex }}
    />
  );
}

export default PreventContext;
