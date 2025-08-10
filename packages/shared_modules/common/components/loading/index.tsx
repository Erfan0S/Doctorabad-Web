import React from "react";
import style from "./Loading.module.scss";
import { Apps } from "@repo/core/types/general";

interface Props {
  size?: number;
  pageLoader?: boolean;
  className?: string;
  app?: Apps;
}
const Loading: React.FC<Props> = ({
  size = 20,
  pageLoader = false,
  className,
  app = Apps.BASE,
}) => {
  const classNames = `${style.loading} ${className} ${style[app]}`;

  if (pageLoader) {
    return (
      <div className={style.pageLoader}>
        <div className={classNames} style={{ width: size }} />
      </div>
    );
  }
  return <div className={classNames} style={{ width: size }} />;
};

export default Loading;
