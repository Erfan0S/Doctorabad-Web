"use client";

import Link from "next/link";
import styles from "./ToolCard.module.scss";
import { Tool } from "@/data/toolsData";

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

  return (
    <div className={styles.card}>
      {/* بخش سمت راست: سوئیچ نمایش در صفحه اصلی */}
      <div
        className={styles.switchWrapper}
        onClick={() => onToggleHomePage && onToggleHomePage(tool.id)}
      >
        <div
          className={`${styles.toggle} ${
            isLoaded && showOnHome ? styles.active : ""
          }`}
        >
          <div className={styles.circle} />
        </div>
      </div>

      {/* بخش وسط: توضیحات لینک دار */}
      <Link href={tool.href} className={styles.content}>
        <h3 className={styles.title}>{tool.title}</h3>
        <p className={styles.desc}>{tool.description}</p>
      </Link>

      {/* بخش سمت چپ: باکس رنگی با حرف */}
      <Link href={tool.href} className={`${styles.iconBox} ${styles[tool.colorClass]}`}>
        {tool.iconChar}
      </Link>
    </div>
  );
}
