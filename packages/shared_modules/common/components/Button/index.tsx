import { Apps } from "@repo/core/types/general";
import React from "react";
import style from "./button.module.scss";
import { ButtonProps } from "@repo/core/types/componentProps";

const Button: React.FC<ButtonProps> = ({
  children,
  app = Apps.BASE,
  styleType = "default",
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={`${className} ${style[app]} ${style.button} ${style[styleType]} ${
        disabled ? style.disabled : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
