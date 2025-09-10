import { GetNextPageParamFunction } from "@tanstack/react-query";
import React from "react";

const generalGetNextPageParam: GetNextPageParamFunction<number, any> = (
  lastPage,
  allPages,
  lastPageParam
) => {
  if (lastPage.data.links.next) {
    return (lastPageParam as number) + 1;
  }
  return undefined;
};

export default generalGetNextPageParam;
