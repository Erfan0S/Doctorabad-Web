"use client";

import styles from "./UpToDatePage.module.scss"; // فایل استایل را پایین‌تر می‌سازیم

export default function UpToDatePage() {
  // 🔴 نکته: آدرس زیر را با لینکی که دکترآباد به شما داده جایگزین کنید.
  // اگر لینک اصلی uptodate.com را بگذارید، احتمالا صفحه سفید می‌شود (مسدود می‌شود).
  const upToDateUrl = "https://doctorabad.com/app/uptodate"; 

  return (
    <div className={styles.container}>
      <iframe
        src={upToDateUrl}
        className={styles.frame}
        title="UpToDate Tool"
        allow="clipboard-write" // برای اینکه کپی کردن متن داخلش کار کند
        loading="lazy"
      />
    </div>
  );
}
