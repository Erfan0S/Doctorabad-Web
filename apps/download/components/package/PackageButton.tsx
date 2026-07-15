"use client";
import React from "react";
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
              authorizeClientAction(() =>
                modalActions.addModal(ModalTypes.AppOnly, {
                  app: Apps.DOWNLOAD,
                }),
              )
      }
      className={`flex w-full flex-1 flex-row items-center ${
        packageItem.user_has_access || packageItem.main_price == null
          ? "px-4 py-2 [&_button]:p-[7px]"
          : "px-[15px] py-[10px]"
      } ${loading ? "pointer-events-none opacity-70" : ""}`}
    >
      <span className="btn-purchase cursor-default">
        {loading ? "در حال دریافت..." : "دانلود کن!"}
      </span>
    </div>
  );
}

export const PackageAppOnlyButton = ({ packageItem }: Props) => {
  if (!packageItem.only_usable_on_app) return null;
  return (
    <div
      className="btn-purchase mr-[10px] h-[45px] w-[75px] flex-none border-[3px] border-solid border-blue bg-white p-[7px] [&_span]:text-[10px] [&_span]:text-blue [&_svg]:h-full [&_svg]:w-full"
      onClick={() =>
        modalActions.addModal(ModalTypes.AppOnly, { app: Apps.DOWNLOAD })
      }
    >
      {/* <PhoneIcon /> */}
      <span>قابل استفاده فقط در اپ</span>
    </div>
  );
};
