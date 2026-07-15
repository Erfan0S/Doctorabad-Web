"use client";

import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2 className="[font-size:xx-large]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="mt-[10px] rounded-[10px] border border-solid border-green-base px-5 leading-[50px] text-green-base transition-all duration-[250ms] [font-size:large] hover:bg-green-base hover:text-white"
        href="/learn"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
