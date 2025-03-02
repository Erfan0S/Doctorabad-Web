import React from "react";
import style from "./Loading.module.scss";

interface Props {
  size?: number;
  pageLoader?: boolean;
  className?: string;
}
const Loading: React.FC<Props> = ({
  size = 20,
  pageLoader = false,
  className,
}) => {
  if (pageLoader) {
    return (
      <div className={style.pageLoader}>
        <div
          className={`${style.loading} ${className}`}
          style={{ width: size, height: size }}
        />
      </div>
    );
  }
  return (
    <div
      className={`${style.loading} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Loading;
