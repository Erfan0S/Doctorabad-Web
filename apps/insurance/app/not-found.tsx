"use client";

import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2 className="text-[xx-large]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="mt-[10px] rounded-[10px] border border-solid border-green-base px-5 text-[large] leading-[50px] text-green-base transition-all duration-[0.25s] hover:bg-green-base hover:text-white"
        href="/clinic"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
