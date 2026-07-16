"use client";

import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h2 className="[font-size:xx-large]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="leading-[50px] mt-[10px] [font-size:large] px-5 text-green border border-solid border-green rounded-[10px] transition-all duration-[250ms] hover:bg-green hover:text-white"
        href="/exam"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
