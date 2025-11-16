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
import InteractionSection from "./InteractionSection/InteractionSection";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<string[]>([]); // تغییر به آرایه
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

  const toggleSection = (key: string) => {
    setOpenSections(
      (prev) =>
        prev.includes(key)
          ? prev.filter((section) => section !== key) // اگر باز بود، ببند
          : [...prev, key] // اگر بسته بود، باز کن
    );
  };

  function buildCategoryTree(categories: any[]) {
    const map = new Map();
    categories.forEach((c) => map.set(c.id, { ...c, children: [] }));

    let root = null;

    categories.forEach((c) => {
      if (c.parent === null) {
        root = map.get(c.id);
      } else {
        map.get(c.parent)?.children.push(map.get(c.id));
      }
    });

    return root;
  }

function renderCategoryTree(node: any, depth = 0) {
  if (!node) return "";

  const indent = "&ensp;".repeat(depth);     // فاصله برای عمق
  const bullet = "> ";                       // علامت شاخه

  // اگر parent نداشت یعنی root است → نباید علامت بگذاریم
  const line = `${indent}${node.parent ? bullet : ""}${node.title}<br/>`;

  let html = line;

  node.children?.forEach((child: any) => {
    html += renderCategoryTree(child, depth + 1);
  });

  return html;
}


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
      content: (() => {
        if (!medicine.categories?.length) return null;

        const tree = buildCategoryTree(medicine.categories);
        return renderCategoryTree(tree);
      })(),
    },

    {
      key: "mechanism",
      label: "مکانیسم اثر",
      content: medicine.effect_mechanism || null,
    },
    {
      key: "brands",
      label: "اسامی‌تجاری",
      content: medicine.brands?.map((b) => `✓ ${b}`).join("<br/>") || null,
    },
    {
      key: "shape",
      label: "اشکال دارویی",
      content: medicine.shapes?.map((s) => `✓ ${s}`).join("<br/>") || null,
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
          ? "DIRECTION_COMPONENT"
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
      content:
        medicine.side_effects?.map((s) => `✓ ${s}`).join("<br/>") || null,
    },
    {
      key: "interaction",
      label: "تداخلات دارویی",
      content:
        medicine.interaction_description || medicine.interaction_medicines ? (
          <InteractionSection
            description={medicine.interaction_description}
            medicines={medicine.interaction_medicines}
          />
        ) : null,
    },

    {
      key: "poisoning",
      label: "مسمومیت",
      content: medicine.poisoning?.map((p) => `✓ ${p}`).join("<br/>") || null,
    },
    {
      key: "points",
      label: "نکات",
      content: medicine.points || null,
    },
  ];

  // فیلتر کردن فقط سکشن‌هایی که محتوا دارن
  const availableSections = allSections.filter((section) => {
    if (section.content === null) return false;
    if (typeof section.content === "string") {
      return section.content.trim() !== "";
    }
    return true;
  });

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
            <PillsIcon className={styles.pillsIcon} width={75} height={75} />
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
                {openSections.includes(key) ? (
                  <DownArrow className={styles.arrow} />
                ) : (
                  <LeftArrow className={styles.arrow} />
                )}
              </span>
            </button>

            {openSections.includes(key) && (
              <div className={styles.sectionContent}>
                {content === "DIRECTION_COMPONENT" ? (
                  <div className={styles.directionContainer}>
                    <div className={styles.directionTabs}>
                      {medicine.direction?.adult?.length ? (
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
                      ) : null}

                      {medicine.direction?.child?.length ? (
                        <button
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "child" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("child")}
                        >
                          کودکان
                        </button>
                      ) : null}

                      {medicine.direction?.elder?.length ? (
                        <button
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "elder" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("elder")}
                        >
                          سالمندان
                        </button>
                      ) : null}
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
                ) : typeof content === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  content
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
