"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MedicineDetails.module.scss";
import { pharmacyApi } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    "adult" | "child" | "elder"
  >("adult");

  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine-details", id],
    queryFn: async () => {
      if (!id) throw new Error("No id");
      const res = await pharmacyApi.getMedicineDetails(Number(id));
      return res.data.data;
    },
    enabled: !!id,
  });

  const toggleSection = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  if (isLoading)
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  if (error || !data)
    return <div className={styles.error}>خطا در دریافت اطلاعات</div>;

  const medicine = data;

  // تعریف همه سکشن‌ها
  const allSections = [
    {
      key: "category",
      label: "دسته‌بندی",
      content: medicine.categories?.length
        ? medicine.categories.map((c) => c.title).join("، ")
        : null,
    },
    {
      key: "mechanism",
      label: "مکانیسم اثر",
      content: medicine.effect_mechanism || null,
    },
    {
      key: "shape",
      label: "اشکال دارویی",
      content: medicine.shapes?.length ? medicine.shapes.join(", ") : null,
    },
    {
      key: "use_case",
      label: "موارد مصرف",
      content: medicine.use_case || null,
    },
    {
      key: "direction",
      label: "دستور مصرف",
      content:
        medicine.direction?.adult?.length ||
        medicine.direction?.child?.length ||
        medicine.direction?.elder?.length
          ? "DIRECTION_COMPONENT" // فلگ مخصوص برای رندر کامپوننت سفارشی
          : null,
    },
    {
      key: "prevention",
      label: "منع مصرف",
      content: medicine.prevention || null,
    },
    {
      key: "pregnant",
      label: "حاملگی و شیردهی",
      content: medicine.pregnant || null,
    },
    {
      key: "side",
      label: "عوارض جانبی",
      content: medicine.side_effects?.length
        ? medicine.side_effects.join(", ")
        : null,
    },
    {
      key: "interaction",
      label: "تداخلات دارویی",
      content:
        medicine.interaction_description?.length ||
        medicine.interaction_medicines?.length
          ? `
              ${medicine.interaction_description?.length ? medicine.interaction_description.join("<br/>") : ""}
              ${medicine.interaction_medicines?.length ? `<br/><br/><b>داروهای مرتبط:</b> ${medicine.interaction_medicines.map((m) => m.title_fa).join(", ")}` : ""}
            `
          : null,
    },
    {
      key: "points",
      label: "نکات",
      content: medicine.points || null,
    },
  ];

  // فیلتر کردن فقط سکشن‌هایی که محتوا دارن
  const availableSections = allSections.filter(
    (section) => section.content !== null && section.content.trim() !== ""
  );

  return (
    <div className={styles.container}>
      {/* --- Header --- */}
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          {medicine.picture ? (
            <Image
              src={medicine.picture ? medicine.picture : ""}
              alt={medicine.title_fa}
              width={100}
              height={100}
              className={styles.img}
            />
          ) : (
            <PillsIcon  className={styles.pillsIcon} width={75} height={75} />
          )}
        </div>

        <div className={styles.titles}>
          <h2 className={styles.title_en}>{medicine.title_en}</h2>
          <h2 className={styles.title_fa}>{medicine.title_fa}</h2>
        </div>
      </div>

      {/* --- Accordion sections --- */}
      <div className={styles.sections}>
        {availableSections.map(({ key, label, content }) => (
          <div key={key} className={styles.section}>
            <button
              className={styles.sectionButton}
              onClick={() => toggleSection(key)}
            >
              {label}
              <span>
                {openSection === key ? (
                  <DownArrow className={styles.arrow} />
                ) : (
                  <LeftArrow className={styles.arrow} />
                )}
              </span>
            </button>
            {openSection === key && (
              <div className={styles.sectionContent}>
                {content === "DIRECTION_COMPONENT" ? (
                  // رندر کامپوننت سفارشی برای دستور مصرف
                  <div className={styles.directionContainer}>
                    <div className={styles.directionTabs}>
                      {medicine.direction?.adult?.length && (
                        <button
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "adult" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("adult")}
                        >
                          <>
                            <span>بزرگسالان</span>{" "}
                            {medicine.direction?.elder?.length
                              ? ""
                              : "و سالمندان "}
                          </>
                        </button>
                      )}
                      {medicine.direction?.child?.length && (
                        <button
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "child" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("child")}
                        >
                          کودکان
                        </button>
                      )}
                      {medicine.direction?.elder?.length && (
                        <button
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "elder" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("elder")}
                        >
                          سالمندان
                        </button>
                      )}
                    </div>
                    <div className={styles.directionContent}>
                      {selectedAgeGroup === "adult" &&
                        medicine.direction?.adult?.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      {selectedAgeGroup === "child" &&
                        medicine.direction?.child?.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      {selectedAgeGroup === "elder" &&
                        medicine.direction?.elder?.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: content! }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
