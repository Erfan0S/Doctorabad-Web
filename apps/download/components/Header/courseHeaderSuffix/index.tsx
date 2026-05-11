"use client";
import { useState } from "react";
import { PackageItem } from "@/types/courses";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";
import { MobileHeaderBaseSiffix } from "@repo/shared_modules/headers";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Loading } from "@repo/shared_modules/components";
import EyeIcon from "../../../assets/svg/eye";
import style from "./courseHeader.module.scss";

type Props = {
  course: PackageItem;
};

const CourseHeaderSiffix = ({ course }: Props) => {
  const [loading, setLoading] = useState(false);
  const sampleUrl = course.sample_file?.[0]?.url;
  console.log("dddsd", course);
  

  const handleDownloadSample = authorizeClientAction(async () => {
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
        id={course.id}
        app={Apps.DOWNLOAD}
        initialFavorite={!!course.favorite}
        shareAction={async () => {
          const res = await api.sharePackage(course.id);

          return {
            title: res.data.data.title,
            description: res.data.data.description,
            url: res.data.data.course_url,
          };
        }}
        favoriteAction={async (isFavorite) => {
          await api[
            !isFavorite ? "addFavorite" : "removeFavorite"
          ](course.id);
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

export default CourseHeaderSiffix;
