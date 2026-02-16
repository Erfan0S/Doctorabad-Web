"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ALL_TOOLS } from "@repo/core/data/toolsData";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import styles from "./DoctorToolsSection.module.scss";
import "swiper/css";

const STORAGE_KEY = "user_home_page_tools";
const DEFAULT_TOOL_IDS = ["wells-dvt", "wells-pte", "abcd2", "apgar"];

function getToolsToShow(): string[] {
  if (typeof window === "undefined") return DEFAULT_TOOL_IDS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return DEFAULT_TOOL_IDS;
}

export default function DoctorToolsSection() {
  const [toolsToShow, setToolsToShow] = useState<string[]>(DEFAULT_TOOL_IDS);

  useEffect(() => {
    setToolsToShow(getToolsToShow());
  }, []);

  const tools = ALL_TOOLS.filter((t) => toolsToShow.includes(t.id));
  const toolsBaseUrl = baseUrls[Apps.TOOLS];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>دکتر تولز</h2>
          <Link
            href={toolsBaseUrl}
            className={styles.viewMore}
          >
            مشاهده بیشتر &gt;
          </Link>
        </div>
        <div className={styles.toolsWrapper}>
          <Swiper
            spaceBetween={12}
            slidesPerView="auto"
            className={styles.swiper}
          >
            {tools.map((tool) => (
              <SwiperSlide key={tool.id} className={styles.slide}>
                <Link
                  href={`${toolsBaseUrl}${tool.href}`}
                  className={`${styles.toolCard} ${styles[tool.colorClass] || styles.green}`}
                >
                  <span className={styles.iconChar}>{tool.iconChar}</span>
                  <span className={styles.toolTitle}>{tool.title}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
