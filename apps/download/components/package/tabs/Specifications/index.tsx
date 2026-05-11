import React from "react";
import style from "./Specifications.module.scss";
import { PackageContentProps } from "../tabs-data";
import { FileType, Language } from "@/types/packages";

const PackageSpecifications = ({ packageItem }: PackageContentProps) => {
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
      value: packageItem.category?.map((c) => c.title).join("، "),
    },
    { label: "نوع فایل", value: getFileTypeLabel(packageItem.file_type) },
    {
      label: "حجم فایل",
      value: packageItem.size ? `${packageItem.size} مگابایت` : "-",
    },
    {
      label: "رشته",
      value: packageItem.fields?.map((f) => f.title).join("، "),
    },
    {
      label: "مقطع",
      value: packageItem.grades?.map((g) => g.title).join("، "),
    },
    {
      label: "موضوع",
      value: packageItem.subjects?.map((g) => g.title).join("، "),
    },
    {
      label: "نویسندگان",
      value: packageItem.authors?.map((a) => a.title).join("، "),
    },
    {
      label: "مترجمان",
      value: packageItem.translators?.map((t) => t.title).join("، "),
    },
    { label: "زبان", value: getLanguageLabel(packageItem.language) },
    { label: "سال عرضه", value: packageItem.publish_date },
    { label: "نوبت چاپ", value: packageItem.edition },
    { label: "نوع جلد", value: packageItem.volume },
    { label: "تعداد صفحات", value: packageItem.page },
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
