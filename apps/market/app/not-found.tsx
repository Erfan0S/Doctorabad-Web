"use client";

import React from "react";

// TODO: duplicated
const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h2 className="text-[xx-large]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="leading-[50px] mt-[10px] text-[large] px-5 text-green border border-solid border-green rounded-[10px] transition-all duration-[250ms] hover:bg-green hover:text-white"
        href="/market"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
