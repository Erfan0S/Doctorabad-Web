import React from "react";
import style from "./Loading.module.scss";
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
  const classNames = `${style.loading} ${className} ${style[app]}`;

  if (pageLoader) {
    return (
      <div className={style.pageLoader}>
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
