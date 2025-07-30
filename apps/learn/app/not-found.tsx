"use client";

import React from "react";
import style from "@/assets/styles/not-found.module.scss";

const NotFound = () => {
  return (
    <div className={style["not-found"]}>
      <h2>صفحه مورد نظر پیدا نشد</h2>
      <a className={style.redirectButton} href="/learn">
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
};

export default NotFound;
