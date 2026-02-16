"use client";

import { useMemo, useRef, useState } from "react";
import { DiseaseCategory } from "@/types/clinic";
import styles from "./CategoryTabs.module.scss";

interface CategoryTabsProps {
  categories: DiseaseCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggedRef = useRef(false);

  const [dragging, setDragging] = useState(false);

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    isDraggingRef.current = false;
    setDragging(false);

    if (e) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    // فقط دکمه اصلی ماوس
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDraggingRef.current = true;
    draggedRef.current = false;

    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    setDragging(true);

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;

    const dx = e.clientX - startXRef.current;

    if (Math.abs(dx) > 4) draggedRef.current = true; // برای جلوگیری از کلیکِ ناخواسته بعد از درگ
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const handleTabClick = (categoryId: number | null) => (e: React.MouseEvent) => {
    // اگر کاربر درگ کرده، کلیک را نادیده بگیر (و فلگ را ریست کن)
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
      return;
    }
    onCategoryChange(categoryId);
  };

  const scrollClassName = useMemo(
    () => `${styles.categoriesScroll} ${dragging ? styles.dragging : ""}`,
    [dragging],
  );

  return (
    <div className={styles.categoriesNav}>
      <div
        ref={scrollRef}
        className={scrollClassName}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => endDrag()}
      >
        {categories.length !== 0 && (
          <div
            className={`${styles.categoryTab} ${
              selectedCategory === null ? styles.active : ""
            }`}
            onClick={handleTabClick(null)}
          >
            همه
          </div>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryTab} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={handleTabClick(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
}
