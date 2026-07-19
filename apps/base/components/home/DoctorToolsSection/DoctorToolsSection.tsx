"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ALL_TOOLS } from "@repo/core/data/toolsData";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { api } from "@repo/shared_modules/api";
import "swiper/css";
import { LeftArrow } from "@/assets/svg/leftArrow";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const STORAGE_SUFFIX = "tools_shortcut";
const DEFAULT_TOOL_IDS = ["uptodate", "gfr", "bmi", "pregnancy", "fena"];
const DEFAULT_TOOL_IDS_DESKTOP = ALL_TOOLS.map((t) => t.id);
const UNAUTHENTICATED_STORAGE_KEY = `guest_${STORAGE_SUFFIX}`;

// رنگ‌های ابزار (قبلا کلاس‌های ماژول scss بودند که با styles[colorClass] خوانده می‌شدند)
const TOOL_COLOR_CLASSES: Record<string, string> = {
  "green-dark": "bg-[#66bb6a]",
  "green-light": "bg-[#cddc39] text-[#333]",
  "green-mid": "bg-[#4caf50]",
  lime: "bg-[#cddc39] text-[#333]",
  teal: "bg-[#009688]",
  yellow: "bg-[#ffeb3b] text-[#333]",
  "orange-light": "bg-[#ffb74d]",
  "orange-dark": "bg-[#f57c00]",
  red: "bg-[#ff5722]",
  "red-dark": "bg-[#b71c1c]",
  pink: "bg-[#e91e63]",
  purple: "bg-[#880e4f]",
  violet: "bg-[#6200ea]",
  "blue-dark": "bg-[#0d47a1]",
  blue: "bg-[#1976d2]",
  cyan: "bg-[#00bcd4]",
  green: "bg-[#4caf50]",
};

const toolCardCls =
  "flex h-[70px] w-[70px] flex-col items-center justify-center rounded-xl p-2 text-white no-underline transition-[transform,box-shadow] duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]";

interface DoctorToolsSectionProps {
  isDesktop?: boolean;
}

export default function DoctorToolsSection({
  isDesktop = false,
}: DoctorToolsSectionProps) {
  const [toolsToShow, setToolsToShow] = useState<string[]>();

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
        resolvedKey = UNAUTHENTICATED_STORAGE_KEY;
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
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-[1.1rem] font-extrabold text-[#141f23]">دکترتولز</h2>
          <Link href={toolsBaseUrl} className="flex items-center gap-1 text-[0.7rem] font-medium text-[#afafaf] no-underline">
            مشاهده بیشتر
            <LeftArrow width={16} height={16} />
          </Link>
        </div>
        <div className="relative">
          <Swiper spaceBetween={12} slidesPerView="auto" className="py-2">
            {tools.map((tool) => (
              <SwiperSlide key={tool?.id} className="flex !w-auto flex-col items-center justify-center gap-2">
                <Link
                  href={`${toolsBaseUrl}${tool?.href}`}
                  className={`${toolCardCls} ${
                    TOOL_COLOR_CLASSES[tool?.colorClass as string] || TOOL_COLOR_CLASSES.green
                  }`}
                >
                  <div className={toolCardCls}>
                    <div className="text-[2.5rem] font-medium">{tool?.iconChar}</div>
                  </div>
                </Link>
                <div className="w-[70px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[0.6rem] font-normal [direction:ltr]">{tool?.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}