"use client";
import React from "react";
import { Button as SharedButton } from "@repo/shared_modules/components";
import { ButtonProps } from "@repo/core/types/componentProps";
import { Apps } from "@repo/core/types/general";

export default function Button({ ...props }: ButtonProps) {
  return (
    <SharedButton {...props} app={Apps.EXAM}>
      {props.children}
    </SharedButton>
  );
}
