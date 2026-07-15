"use client";

import Link from "next/link";
import { Tool } from "@/data/toolsData";

// رنگ بندی طبق عکس (معادل کلاس‌های رنگی قبلی در scss)
const COLOR_CLASSES: Record<string, string> = {
  "green-dark": "bg-[#66bb6a]",
  "green-light": "bg-[#cddc39] text-white", // لیمویی
  yellow: "bg-[#ffeb3b] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",
  "orange-light": "bg-[#ffb74d]",
  "orange-dark": "bg-[#f57c00]",
  red: "bg-[#ff5722]",
  "red-dark": "bg-[#b71c1c]", // قرمز جیگری
  pink: "bg-[#e91e63]", // صورتی
  purple: "bg-[#880e4f]", // بنفش تیره
  violet: "bg-[#6200ea]", // بنفش روشن
  "blue-dark": "bg-[#0d47a1]", // سرمه‌ای
  blue: "bg-[#1976d2]", // آبی
  cyan: "bg-[#00bcd4]", // فیروزه‌ای
  teal: "bg-[#009688]", // کله غازی
  "green-mid": "bg-[#4caf50]", // سبز
  lime: "bg-[#cddc39] text-[#333]", // مغز پسته‌ای
};

interface Props {
  tool: Tool;
  isOnHomePage?: boolean;
  onToggleHomePage?: (toolId: string) => void;
  isLoaded?: boolean;
}

export default function ToolCard({
  tool,
  isOnHomePage = false,
  onToggleHomePage,
  isLoaded = true,
}: Props) {
  const showOnHome = isOnHomePage;
  const isActive = isLoaded && showOnHome;

  return (
    <div className="mb-3 flex flex-row-reverse items-center justify-between rounded-xl border border-solid border-[#e5e7eb] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-transform duration-200 active:scale-[0.98]">
      {/* بخش سمت راست: سوئیچ نمایش در صفحه اصلی */}
      <div
        className="flex cursor-pointer items-center pl-2"
        onClick={() => onToggleHomePage && onToggleHomePage(tool.id)}
      >
        {/* استایل سوئیچ شبیه iOS/عکس */}
        <div
          className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
            isActive ? "bg-[#34c759]" : "bg-[#e5e5ea]"
          }`}
        >
          <div
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-300 ${
              isActive ? "translate-x-5" : ""
            }`}
          />
        </div>
      </div>

      {/* بخش وسط: توضیحات لینک دار */}
      <Link href={tool.href} className="flex-1 px-3 text-right text-inherit no-underline">
        <h1 className="m-0 mb-1 text-base font-bold text-[#333]">{tool.title}</h1>
        <p className="m-0 text-[0.8rem] leading-[1.4] text-[#666]">{tool.description}</p>
      </Link>

      {/* بخش سمت چپ: باکس رنگی با حرف */}
      <Link
        href={tool.href}
        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-[1.8rem] font-light text-white no-underline ${
          COLOR_CLASSES[tool.colorClass] ?? ""
        }`}
      >
        {tool.iconChar}
      </Link>
    </div>
  );
}
