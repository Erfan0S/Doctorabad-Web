"use client";
import { Apps } from "@repo/core/types/general";
import React from "react";
import { ButtonProps } from "@repo/core/types/componentProps";

// Tailwind replacement for the old scss-module `style[variant]` lookup
const variantClasses: Record<string, string> = {
  default: "border-0 bg-button-bg font-normal text-white",
  secondary: "border-0 bg-white font-normal text-app-base",
  outline:
    "border-2 border-solid border-app-base bg-white font-semibold text-app-base",
  danger: "border-0 bg-[#ff0000] font-normal text-white",
};

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
      suppressHydrationWarning
      className={`${className} ${app} flex flex-1 cursor-pointer select-none flex-wrap items-center justify-center rounded-[12px] p-[9px] text-center text-[16px] shadow-[0_1px_10px_rgba(0,0,0,0.15)] focus:outline-none [&_a]:w-full [&_a]:text-white ${variantClasses[variant] || ""} ${
        disabled ? "!cursor-not-allowed !border-0 !bg-[#a8a8a8] !font-normal !text-white" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
