import { Apps } from "@repo/core/types/general";
import { BaseUiProps } from "@repo/core/types/props";
import React from "react";
import style from "../uiComponents.module.scss";

function Input({
  app = Apps.BASE,
  className,
  ...rest
}: BaseUiProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  return (
    <input className={`${style.input} ${style[app]} ${className}`} {...rest} />
  );
}

export default Input;
