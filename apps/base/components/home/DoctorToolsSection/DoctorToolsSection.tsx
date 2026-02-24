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

const FALLBACK_STORAGE_KEY = "user_home_page_tools";
const STORAGE_SUFFIX = "tools_shortcut";

export default function DoctorToolsSection() {
  const [toolsToShow, setToolsToShow] = useState<string[]>();

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") {
        setToolsToShow([]);
        return;
      }

      let resolvedKey = FALLBACK_STORAGE_KEY;

      try {
        const response = await api.getUser();
        const user = response.data.data;
        if (user?.mobile) {
          resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
        }
      } catch (e) {
        // اگر کاربر لاگین نباشد یا فراخوانی خطا بدهد، از کلید پیش‌فرض استفاده می‌کنیم
        console.error("Error fetching user for tools storage:", e);
      }

      let stored = localStorage.getItem(resolvedKey);

      // مهاجرت از کلید قدیمی به کلید جدید در صورت نیاز
      if (!stored && resolvedKey !== FALLBACK_STORAGE_KEY) {
        stored = localStorage.getItem(FALLBACK_STORAGE_KEY);
      }

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
