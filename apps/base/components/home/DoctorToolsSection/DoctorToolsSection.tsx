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

const STORAGE_SUFFIX = "tools_shortcut";

export default function DoctorToolsSection() {
  const [toolsToShow, setToolsToShow] = useState<string[]>();

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") {
        setToolsToShow([]);
        return;
      }

      let resolvedKey: string | null = null;

      try {
        const response = await api.getUser();
        const user = response.data.data;
        if (user?.mobile) {
          resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
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

      setToolsToShow([]);
    };

    void init();
  }, []);

  const tools = ALL_TOOLS.filter((t) => toolsToShow?.includes(t.id));
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
            مشاهده بیشتر<LeftArrow width={16} height={16} />
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
                </Link>
                <span className={styles.toolTitle}>{tool.title}</span>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
