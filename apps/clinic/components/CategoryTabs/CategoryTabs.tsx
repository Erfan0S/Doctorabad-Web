"use client";

import { useMemo, useRef, useState } from "react";
import { DiseaseCategory } from "@/types/clinic";

interface CategoryTabsProps {
  categories: DiseaseCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

const SCROLL_BASE =
  "flex gap-2 overflow-x-auto px-4 [touch-action:pan-x] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const TAB_BASE =
  "shrink-0 cursor-pointer whitespace-nowrap bg-[#f3f3f3] px-5 py-2 text-sm text-black transition-all duration-200 active:scale-95 [font-family:var(--font-iran-sans)]";

const tabClass = (isActive: boolean) =>
  `${TAB_BASE} ${
    isActive
      ? "border-0 border-b-[5px] border-solid border-green-base font-extrabold"
      : "border-none font-medium"
  }`;

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
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDraggingRef.current = true;
    draggedRef.current = false;

    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    setDragging(true);

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;

    const dx = e.clientX - startXRef.current;

    if (Math.abs(dx) > 4) draggedRef.current = true; 
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const handleTabClick = (categoryId: number | null) => (e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
      return;
    }
    onCategoryChange(categoryId);
  };

  const scrollClassName = useMemo(
    () =>
      `${SCROLL_BASE} ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`,
    [dragging],
  );

  return (
    <div className="sticky top-28 z-50 bg-[#f3f3f3] pt-3 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
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
            className={tabClass(selectedCategory === null)}
            onClick={handleTabClick(null)}
          >
            همه
          </div>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className={tabClass(selectedCategory === category.id)}
            onClick={handleTabClick(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
}
