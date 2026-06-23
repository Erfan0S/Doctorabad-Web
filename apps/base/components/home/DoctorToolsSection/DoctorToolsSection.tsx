"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ALL_TOOLS } from "@repo/core/data/toolsData";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { api } from "@repo/shared_modules/api";
import styles from "./DoctorToolsSection.module.scss";
import "swiper/css";
import { LeftArrow } from "@/assets/svg/leftArrow";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const STORAGE_SUFFIX = "tools_shortcut";
const DEFAULT_TOOL_IDS = ["uptodate", "gfr", "bmi", "pregnancy", "fena"];
const DEFAULT_TOOL_IDS_DESKTOP = ALL_TOOLS.map((t) => t.id); //all

interface DoctorToolsSectionProps {
  isDesktop?: boolean;
}

export default function DoctorToolsSection({
  isDesktop = false,
}: DoctorToolsSectionProps) {
  const [toolsToShow, setToolsToShow] = useState<string[]>();

  // 👇 انتخاب آرایهٔ پیش‌فرض بر اساس دسکتاپ/موبایل
  const defaultToolIds = isDesktop ? DEFAULT_TOOL_IDS_DESKTOP : DEFAULT_TOOL_IDS;

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") {
        setToolsToShow([]);
        return;
      }

      let resolvedKey: string | null = null;
      try {
        if (isUserLoggedIn()) {
          const response = await api.getUser();
          const user = response.data.data;
          if (user?.mobile) {
            resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
          }
        }
      } catch (e) {
        console.error("Error fetching user for tools storage:", e);
      }

      if (!resolvedKey) {
        setToolsToShow([]);
        return;
      }

      const stored = localStorage.getItem(resolvedKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const normalized = parsed
              .filter((id): id is string => typeof id === "string")
              .map((id) => id.replace(/-/g, "_"));
            setToolsToShow(normalized);
            return;
          }
        } catch (e) {
          console.error("Error parsing home page tools:", e);
        }
      }

      setToolsToShow(defaultToolIds);
      localStorage.setItem(resolvedKey, JSON.stringify(defaultToolIds));
    };

    void init();
  }, [defaultToolIds]);

  const customTools =
    toolsToShow?.filter((id) => !defaultToolIds.includes(id)) ?? [];
  const defaultTools = defaultToolIds.filter((id) =>
    toolsToShow?.includes(id),
  );

  const orderedToolIds = [...customTools, ...defaultTools];
  const tools = orderedToolIds
    .map((id) => ALL_TOOLS.find((t) => t.id === id))
    .filter(Boolean);

  const toolsBaseUrl = baseUrls[Apps.TOOLS];

  return (
    <section className="container">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>دکترتولز</h2>
          <Link href={toolsBaseUrl} className={styles.viewMore}>
            مشاهده بیشتر
            <LeftArrow width={16} height={16} />
          </Link>
        </div>
        <div className={styles.toolsWrapper}>
          <Swiper spaceBetween={12} slidesPerView="auto" className={styles.swiper}>
            {tools.map((tool) => (
              <SwiperSlide key={tool?.id} className={styles.slide}>
                <Link
                  href={`${toolsBaseUrl}${tool?.href}`}
                  className={`${styles.toolCard} ${
                    styles[tool?.colorClass as string] || styles.green
                  }`}
                >
                  <div className={styles.toolCard}>
                    <div className={styles.iconChar}>{tool?.iconChar}</div>
                  </div>
                </Link>
                <div className={styles.toolTitle}>{tool?.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}