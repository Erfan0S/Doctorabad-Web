import React from "react";
import { Apps } from "@repo/core/types/general";

export interface LoadingProps {
  size?: number;
  pageLoader?: boolean;
  className?: string;
  app?: Apps;
  haveMargin?: boolean;
}
const Loading: React.FC<LoadingProps> = ({
  size = 20,
  pageLoader = false,
  className,
  app = Apps.BASE,
  haveMargin = false,
}) => {
  const classNames = `mx-auto aspect-[1/1] h-[25px] w-[25px] rounded-full border-2 border-solid [border-color:#ddd_#ddd_var(--app-base,#4fcc4c)] animate-[spin_0.5s_linear_infinite] ${className} ${app}`;

  if (pageLoader) {
    return (
      <div className="flex h-[80vh] min-h-full items-center justify-center">
        <div className={classNames} style={{ width: size, height: size }} />
      </div>
    );
  }
  return (
    <div
      className={classNames}
      style={{
        width: size,
        height: size,
        margin: haveMargin ? "10px auto" : undefined,
      }}
    />
  );
};

export default Loading;
