import React from "react";
import styles from "./AppOnly.module.scss";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { Close_X } from "@repo/shared_modules/icons";
import { Apps } from "@repo/core/types/general";

type Props = {
  closeModal: () => void;
  app?: Apps;
};

export default function AppOnly({ closeModal, app }: Props) {
  const getButtonClass = () => {
    switch (app) {
      case Apps.LEARN:
        return styles.learn;
      case Apps.DOWNLOAD:
        return styles.download;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.appOnly}>
      <Close_X onClick={closeModal} className={styles.closeIcon} />
      <p>
        این دوره فقط از طریق اپلیکیشن موبایل دکترآباد قابل مشاهده است
        <br />
        از طریق لینک زیر میتوانید اپ را دانلود نمایید
        <br />
        <a 
          href={baseUrls.base + routePath.appDownload} 
          target="_blank" 
          className={getButtonClass()}
          rel="noreferrer"
        >
          دانلود اپلیکیشن دکترآباد
        </a>
      </p>
    </div>
  );
}
