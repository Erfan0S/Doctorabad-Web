"use client";
import React from "react";
import style from "./Package.module.scss";
import { PackageItem } from "@/types/packages";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";

type Props = {
  packageItem: PackageItem;
};

export function PackageActiveButton({ packageItem }: Props) {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = authorizeClientAction(async () => {
    try {
      setLoading(true);

      const { data } = (await api.getPackageFile(packageItem.id)).data;

      if (data?.url) {
        const link = document.createElement("a");
        link.href = data.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div
      onClick={
        !packageItem.only_usable_on_app
          ? handleDownload
          : () =>
              modalActions.addModal(ModalTypes.AppOnly, { app: Apps.DOWNLOAD })
      }
      className={`${style.purchaseButtonWrapper} ${(packageItem.user_has_access || packageItem.main_price == null) && style.purchaseBarAccess} ${loading && style.loading}`}
    >
      <span className={`${style.purchaseButton} ${style.purchaseButtonActive}`}>
        {loading ? "در حال دریافت..." : "دانلود کن!"}
      </span>
    </div>
  );
}

export const PackageAppOnlyButton = ({ packageItem }: Props) => {
  if (!packageItem.only_usable_on_app) return null;
  return (
    <div
      className={`${style.appOnly} ${style.purchaseButton}`}
      onClick={() =>
        modalActions.addModal(ModalTypes.AppOnly, { app: Apps.DOWNLOAD })
      }
    >
      {/* <PhoneIcon /> */}
      <span>قابل استفاده فقط در اپ</span>
    </div>
  );
};
