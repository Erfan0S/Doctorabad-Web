import React from "react";
import style from "./Loading.module.scss";

interface Props {
  size?: number;
  pageLoader?: boolean;
  className?: string;
  color?: "red" | "green" | "orange";
}
const Loading: React.FC<Props> = ({
  size = 20,
  pageLoader = false,
  className,
  color = "green",
}) => {
  const classNames = `${style.loading} ${className} ${style[color]}`;

  if (pageLoader) {
    return (
      <div className={style.pageLoader}>
        <div className={classNames} style={{ width: size, height: size }} />
      </div>
    );
  }
  return <div className={classNames} style={{ width: size, height: size }} />;
};

export default Loading;
