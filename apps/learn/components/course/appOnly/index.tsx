import React from "react";
import styles from "./AppOnly.module.scss";
import { baseUrls, routePath } from "@repo/core/constants/routePath";

export default function AppOnly() {
  return (
    <div className={styles.appOnly}>
      <p>
        متاسفانه با استفاده از مرورگر قادر به مشاهده محتوای این دوره نخواهید
        بود.
        <br />
        این دوره تنها از طریق برنامه قابل دسترسی است.
        <br />
        با کلیک بر روی لینک زیر برنامه دکترآباد را دانلود کنید.
        <br />
        <a href={baseUrls.base + routePath.appDownload} target="_blank">
          دانلود برنامه دکترآباد
        </a>
      </p>
    </div>
  );
}
