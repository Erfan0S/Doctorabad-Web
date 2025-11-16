// app/pharmacy/page.tsx
"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { MedicineListParams } from "@/types/pharmacy";
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import PharmacySlider from "@/components/PharmacySlider/PharmacySlider";
import PharmacySearchSection from "@/components/PharmacySearchSection/PharmacySearchSection";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import MedicineList from "@/components/MedicineList/MedicineList";
import PharmacySliderSkeleton from "@/components/Skeletons/PharmacySliderSkeleton/PharmacySliderSkeleton";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/pharmacy";

export default function PharmacyHomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  

  // Query for categories
  const { data: categoriesData } = useQuery({
    queryKey: ["medicineCategories"],
    queryFn: async () => {
      const response = await pharmacyApi.getMedicineCategories();
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, 
  });

  // Query for sliders
  const { data: slidersData, isLoading: slidersLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const response = await pharmacyApi.getSliderList();
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Infinite query for medicines
  const {
    data: medicinesData,
    isLoading: medicinesLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["medicines", selectedCategory, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const params: MedicineListParams = { page: pageParam };
      
      if (searchQuery.trim()) {
        params.title = searchQuery.trim();
      } else if (selectedCategory) {
        params.category_id = selectedCategory;
      }

      const response = await pharmacyApi.getMedicineList(params);
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Flatten medicines from all pages
  const medicines = useMemo(() => {
    return medicinesData?.pages.flatMap((page) => page.data) ?? [];
  }, [medicinesData]);

  const categories = categoriesData ?? [];
  const sliders = slidersData ?? [];

  // Check if in search mode
  const isSearchMode = searchQuery.trim().length > 0;

  // Initial loading state
  const initialLoading = medicinesLoading && !medicinesData;

  // Handle category change
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle categories click
  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  // Load more medicines
  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="داروخانه من" />
      <PharmacySearchSection 
        onCategoriesClick={handleCategoriesClick}
        onSearch={handleSearch}
      />
      
      {!isSearchMode && (
        <>
          {slidersLoading ? (
            <PharmacySliderSkeleton />
          ) : (
            <PharmacySlider sliders={sliders} />
          )}
          
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </>
      )}

      {initialLoading ? (
        <MedicineListSkeleton count={8} />
      ) : (
        <MedicineList
          medicines={medicines}
          loading={isFetchingNextPage}
          hasMore={hasNextPage ?? false}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}