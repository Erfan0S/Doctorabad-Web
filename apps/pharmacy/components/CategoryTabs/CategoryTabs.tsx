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
          <div
            className={`${styles.categoryTab} ${
              selectedCategory === null ? styles.active : ""
            }`}
            onClick={() => onCategoryChange(null)}
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
            onClick={() => onCategoryChange(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
}
