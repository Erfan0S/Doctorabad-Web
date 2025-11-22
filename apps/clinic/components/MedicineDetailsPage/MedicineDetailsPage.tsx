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
import MedicineDetailsSkeleton from "@/components/Skeletons/MedicineDetailsSkeleton/MedicineDetailsSkeleton";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<string[]>([]);
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
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((section) => section !== key)
        : [...prev, key]
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

    const indent = "&ensp;".repeat(depth);
    const bullet = "> ";

    const line = `${indent}${node.parent ? bullet : ""}${node.title}<br/>`;

    let html = line;

    node.children?.forEach((child: any) => {
      html += renderCategoryTree(child, depth + 1);
    });

    return html;
  }

  if (isLoading) return <MedicineDetailsSkeleton />;
  if (error || !data)
    return <div className={styles.error}>خطا در دریافت اطلاعات</div>;

  const medicine = data;

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
        <div className={styles.top}>
          {medicine.title_en}
          <div > {medicine.picture ? (
            <Image
              src={medicine.picture ? medicine.picture : ""}
              alt={medicine.title_fa}
              width={140}
              height={140}
              className={styles.image}
            />
          ) : (
            <PillsIcon className={styles.pillsIcon} width={100} height={100} />
          )}</div>
        </div>

        <div className={styles.bottom}>{medicine.title_fa}</div>
      </div>

      {/* --- Accordion sections --- */}
      <div className={styles.sections}>
        {availableSections.map(({ key, label, content }) => (
          <div key={key} className={styles.section}>
            <div
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
            </div>

            {openSections.includes(key) && (
              <div className={styles.sectionContent}>
                {content === "DIRECTION_COMPONENT" ? (
                  <div className={styles.directionContainer}>
                    <div className={styles.directionTabs}>
                      {medicine.direction?.adult?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "adult" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("adult")}
                        >
                          <>
                            بزرگسالان{" "}
                            {medicine.direction?.elder?.length
                              ? ""
                              : "و سالمندان "}
                          </>
                        </div>
                      ) : null}

                      {medicine.direction?.child?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "child" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("child")}
                        >
                          کودکان
                        </div>
                      ) : null}

                      {medicine.direction?.elder?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "elder" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("elder")}
                        >
                          سالمندان
                        </div>
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
