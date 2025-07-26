import { Apps } from "@repo/core/types/general";
import React from "react";
import style from "./button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  app?: Apps;
  styleType?: "default" | "outline";
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  app = Apps.BASE,
  styleType = "default",
  disabled,
  className,
  ...rest
}: Props) => {
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
