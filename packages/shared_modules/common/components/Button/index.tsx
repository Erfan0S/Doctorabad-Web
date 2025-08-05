import { Apps } from "@repo/core/types/general";
import React from "react";
import style from "./button.module.scss";
import { ButtonProps } from "@repo/core/types/componentProps";

const Button: React.FC<ButtonProps> = ({
  children,
  app = Apps.BASE,
  variant = "default",
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={`${className} ${style[app]} ${style.button} ${style[variant]} ${
        disabled ? style.disabled : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
