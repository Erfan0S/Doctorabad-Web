import { Apps } from "@repo/core/types/general";
import { BaseUiProps } from "@repo/core/types/props";
import React from "react";

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
    <input
      className={`w-full rounded-[10px] border border-solid border-app-base px-[10px] py-[5px] focus:outline-none ${app} ${className}`}
      {...rest}
    />
  );
}

export default Input;
