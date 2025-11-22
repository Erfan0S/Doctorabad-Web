"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./DiseaseDetails.module.scss";
import { clinicApi } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";
import InteractionSection from "./InteractionSection/InteractionSection";
import DiseaseDetailsSkeleton from "@/components/Skeletons/DiseaseDetailsSkeleton/DiseaseDetailsSkeleton";

export default function DiseaseDetailsPage() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    "adult" | "child" | "elder"
  >("adult");

  const { data, isLoading, error } = useQuery({
    queryKey: ["disease-details", id],
    queryFn: async () => {
      if (!id) throw new Error("No id");
      const res = await clinicApi.getDiseaseDetails(Number(id));
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

  if (isLoading) return <DiseaseDetailsSkeleton />;
  if (error || !data)
    return <div className={styles.error}>خطا در دریافت اطلاعات</div>;

  const disease = data;

  const allSections = [
    {
      key: "category",
      label: "دسته‌بندی",
      content: (() => {
        if (!disease.categories?.length) return null;

        const tree = buildCategoryTree(disease.categories);
        return renderCategoryTree(tree);
      })(),
    },

    {
      key: "mechanism",
      label: "مکانیسم اثر",
      content: disease.effect_mechanism || null,
    },
    {
      key: "brands",
      label: "اسامی‌تجاری",
      content: disease.brands?.map((b) => `✓ ${b}`).join("<br/>") || null,
    },
    {
      key: "shape",
      label: "اشکال دارویی",
      content: disease.shapes?.map((s) => `✓ ${s}`).join("<br/>") || null,
    },
    {
      key: "use_case",
      label: "موارد مصرف",
      content: disease.use_case || null,
    },
    {
      key: "direction",
      label: "دستور مصرف",
      content:
        disease.direction?.adult?.length ||
        disease.direction?.child?.length ||
        disease.direction?.elder?.length
          ? "DIRECTION_COMPONENT"
          : null,
    },
    {
      key: "prevention",
      label: "منع مصرف",
      content: disease.prevention || null,
    },
    {
      key: "pregnant",
      label: "حاملگی و شیردهی",
      content: disease.pregnant || null,
    },
    {
      key: "side",
      label: "عوارض جانبی",
      content:
        disease.side_effects?.map((s) => `✓ ${s}`).join("<br/>") || null,
    },
    {
      key: "interaction",
      label: "تداخلات دارویی",
      content:
        disease.interaction_description || disease.interaction_diseases ? (
          <InteractionSection
            description={disease.interaction_description}
            diseases={disease.interaction_diseases}
          />
        ) : null,
    },

    {
      key: "poisoning",
      label: "مسمومیت",
      content: disease.poisoning?.map((p) => `✓ ${p}`).join("<br/>") || null,
    },
    {
      key: "points",
      label: "نکات",
      content: disease.points || null,
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
          {disease.title_en}
          <div > {disease.picture ? (
            <Image
              src={disease.picture ? disease.picture : ""}
              alt={disease.title_fa}
              width={140}
              height={140}
              className={styles.image}
            />
          ) : (
            <PillsIcon className={styles.pillsIcon} width={100} height={100} />
          )}</div>
        </div>

        <div className={styles.bottom}>{disease.title_fa}</div>
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
                      {disease.direction?.adult?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "adult" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("adult")}
                        >
                          <>
                            بزرگسالان{" "}
                            {disease.direction?.elder?.length
                              ? ""
                              : "و سالمندان "}
                          </>
                        </div>
                      ) : null}

                      {disease.direction?.child?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            selectedAgeGroup === "child" ? styles.active : ""
                          }`}
                          onClick={() => setSelectedAgeGroup("child")}
                        >
                          کودکان
                        </div>
                      ) : null}

                      {disease.direction?.elder?.length ? (
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
                        disease.direction?.adult?.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}

                      {selectedAgeGroup === "child" &&
                        disease.direction?.child?.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}

                      {selectedAgeGroup === "elder" &&
                        disease.direction?.elder?.map((item, index) => (
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

