import React from "react";
import styles from "./AppOnly.module.scss";
import { baseUrls, routePath } from "@repo/core/constants/routePath";

export default function AppOnly() {
  return (
    <div className={styles.appOnly}>
      <p>
        این دوره فقط از طریق اپلیکیشن موبایل دکترآباد قابل مشاهده است
        <br />
        از طریق لینک زیر میتوانید اپ را دانلود نمایید
        <br />
        <a href={baseUrls.base + routePath.appDownload} target="_blank">
          دانلود برنامه دکترآباد
        </a>
      </p>
    </div>
  );
}
