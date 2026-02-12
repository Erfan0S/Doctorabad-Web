"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { DiseaseCategory } from "@/types/clinic";
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
    queryKey: ["diseaseCategories"],
    queryFn: async () => {
      const response = await clinicApi.getDiseaseCategories();
      return response.data.data as DiseaseCategory[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = data ?? [];
  const handleCategoryChange = useCallback(
    (categoryId: number | null) => {
      onSelectCategory(categoryId);
      window.scrollTo({ top: 470, behavior: "smooth" });
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

