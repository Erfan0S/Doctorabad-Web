"use client";

import { MedicineCategory } from "@/types/pharmacy";
import styles from "./CategoryTabs.module.scss";

interface CategoryTabsProps {
  categories: MedicineCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void; 
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className={styles.categoriesNav}>
      <div className={styles.categoriesScroll}>
        {categories.length !== 0 && (
          <button
            className={`${styles.categoryTab} ${
              selectedCategory === null ? styles.active : ""
            }`}
            onClick={() => onCategoryChange(null)}
          >
            همه
          </button>
        )}

        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryTab} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
}
