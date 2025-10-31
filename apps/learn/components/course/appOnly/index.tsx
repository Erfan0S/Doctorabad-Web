import React from "react";
import styles from "./AppOnly.module.scss";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { Close_X } from "@repo/shared_modules/icons";

type Props = {
  closeModal: () => void;
};

export default function AppOnly({ closeModal }: Props) {
  return (
    <div className={styles.appOnly}>
      <Close_X onClick={closeModal} className={styles.closeIcon} />
      <p>
        این دوره فقط از طریق اپلیکیشن موبایل دکترآباد قابل مشاهده است
        <br />
        از طریق لینک زیر میتوانید اپ را دانلود نمایید
        <br />
        <a href={baseUrls.base + routePath.appDownload} target="_blank">
          دانلود اپلیکیشن دکترآباد
        </a>
      </p>
    </div>
  );
}
