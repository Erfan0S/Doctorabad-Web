import React from "react";
import { CourseContentProps } from "../tabs-data";
import style from "./Specifications.module.scss";
import { FileType, Language } from "@/types/courses";

const PackageSpecifications = ({ course }: CourseContentProps) => {
  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case Language.Persian:
        return "فارسی";
      case Language.English:
        return "انگلیسی";
      case Language.Arabic:
        return "عربی";
      default:
        return "-";
    }
  };

  const getFileTypeLabel = (type: FileType) => {
    switch (type) {
      case FileType.Pdf:
        return "PDF";
      case FileType.Epub:
        return "Epub";
      case FileType.PowerPoint:
        return "PowerPoint";
      default:
        return "-";
    }
  };

  const specData = [
    {
      label: "دسته‌بندی",
      value: course.category?.map((c) => c.title).join("، "),
    },
    { label: "نوع فایل", value: getFileTypeLabel(course.file_type) },
    { label: "حجم فایل", value: course.size ? `${course.size} مگابایت` : "-" },
    { label: "رشته", value: course.fields?.map((f) => f.title).join("، ") },
    { label: "مقطع", value: course.grades?.map((g) => g.title).join("، ") },
    { label: "موضوع", value: course.subjects?.map((g) => g.title).join("، ") },
    {
      label: "نویسندگان",
      value: course.authors?.map((a) => a.title).join("، "),
    },
    {
      label: "مترجمان",
      value: course.translators?.map((t) => t.title).join("، "),
    },
    { label: "زبان", value: getLanguageLabel(course.language) },
    { label: "سال عرضه", value: course.publish_date },
    { label: "نوبت چاپ", value: course.edition },
    { label: "نوع جلد", value: course.volume },
    { label: "تعداد صفحات", value: course.page },
  ].filter((item) => item.value && item.value !== "0" && item.value !== "");

  return (
    <div className={style.specifications}>
      <table>
        <tbody>
          {specData
            .filter((item) => item.value !== "-")
            .map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageSpecifications;
