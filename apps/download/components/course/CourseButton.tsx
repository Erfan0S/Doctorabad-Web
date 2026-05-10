"use client";
import React from "react";
import style from "./Course.module.scss";
import { PackageItem } from "@/types/courses";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";

type Props = {
  course: PackageItem;
};

export function CourseActiveButton({ course }: Props) {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = authorizeClientAction(async () => {
    try {
      setLoading(true);

      const { data } = (await api.getPackageFile(course.id)).data;

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
        !course.only_usable_on_app
          ? handleDownload
          : () =>
              modalActions.addModal(ModalTypes.AppOnly, { app: Apps.DOWNLOAD })
      }
      className={`${style.purchaseButtonWrapper} ${(course.user_has_access || course.main_price == null) && style.purchaseBarAccess} ${loading && style.loading}`}
    >
      <span className={`${style.purchaseButton} ${style.purchaseButtonActive}`}>
        {loading ? "در حال دریافت..." : "دانلود کن!"}
      </span>
    </div>
  );
}

export const CourseAppOnlyButton = ({ course }: Props) => {
  if (!course.only_usable_on_app) return null;
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
