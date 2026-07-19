'use client';

import React from 'react';

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2 className="text-[length:xx-large]">صفحه مورد نظر پیدا نشد</h2>
      <a
        className="mt-[10px] rounded-[10px] border border-solid border-green-base px-5 text-[length:large] leading-[50px] text-green-base transition duration-[250ms] hover:bg-green-base hover:text-white"
        href="/"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
