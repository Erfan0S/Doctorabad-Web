"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { MedicineCategory } from "@/types/pharmacy";
import CategoryTabs from "./CategoryTabs";
import CategoryTabsSkeleton from "@/components/Skeletons/CategoryTabsSkeleton/CategoryTabsSkeleton";

interface CategoryTabsSectionProps {
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export default function CategoryTabsSection({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsSectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["medicineCategories"],
    queryFn: async () => {
      const response = await pharmacyApi.getMedicineCategories();
      return response.data.data as MedicineCategory[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = data ?? [];

  const handleCategoryChange = useCallback(
    (categoryId: number | null) => {
      onSelectCategory(categoryId); // این الان تابعی است که در بالا نوشتیم و اسکرول هم میکند
    },
    [onSelectCategory],
  );

  if (isLoading && categories.length === 0) {
    return <CategoryTabsSkeleton />;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <CategoryTabs
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );
}

