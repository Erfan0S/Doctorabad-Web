"use client";
import { useState } from "react";
import { PackageItem } from "@/types/packages";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";
import { MobileHeaderBaseSiffix } from "@repo/shared_modules/headers";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Loading } from "@repo/shared_modules/components";
import EyeIcon from "../../../assets/svg/eye";
import style from "./packageHeader.module.scss";

type Props = {
  packageItem: PackageItem;
};

const PackageHeaderSuffix = ({ packageItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const sampleUrl = packageItem.sample_file?.[0]?.url;

  const handleDownloadSample = (async () => {
    if (!sampleUrl) return;
    try {
      setLoading(true);

      const link = document.createElement("a");
      link.href = sampleUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Sample download failed:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <MobileHeaderBaseSiffix
        id={packageItem.id}
        app={Apps.DOWNLOAD}
        initialFavorite={!!packageItem.favorite}
        shareAction={async () => {
          const res = await api.sharePackage(packageItem.id);

          return {
            title: res.data.data.title,
            description: res.data.data.description,
            url: res.data.data.package_url || "",
          };
        }}
        favoriteAction={async (isFavorite) => {
          await api[
            !isFavorite ? "addFavorite" : "removeFavorite"
          ](packageItem.id);
        }}
      />
      {sampleUrl && (
        <button
          className={style.headerButton}
          onClick={handleDownloadSample}
          disabled={loading}
        >
          {loading ? <Loading size={24} app={Apps.DOWNLOAD} /> : <EyeIcon />}
        </button>
      )}
    </>
  );
};

export default PackageHeaderSuffix;
