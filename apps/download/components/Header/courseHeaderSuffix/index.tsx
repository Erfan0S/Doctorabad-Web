"use client";
import { PackageItem } from "@/types/courses";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";
import { MobileHeaderBaseSiffix } from "@repo/shared_modules/headers";

type Props = {
  course: PackageItem;
};

const CourseHeaderSiffix = ({ course }: Props) => {
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
          await api[!isFavorite ? "addPackageFavorite" : "removePackageFavorite"](course.id);
        }}
      />
    </>
  );
};

export default CourseHeaderSiffix;
