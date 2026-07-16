"use client";

import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2 className="text-[32px]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="mt-[10px] rounded-[10px] border border-solid border-green px-5 text-[18px] leading-[50px] text-green transition-all duration-[250ms] hover:bg-green hover:text-white"
        href="/learn"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
