// app/pharmacy/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { pharmacyApi } from "@/api/Api";
import { Medicine, MedicineCategory, Slider, MedicineListParams } from "@/types/pharmacy";
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import PharmacySlider from "@/components/PharmacySlider/PharmacySlider";
import PharmacySearchSection from "@/components/PharmacySearchSection/PharmacySearchSection";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import MedicineList from "@/components/MedicineList/MedicineList";
import PharmacySliderSkeleton from "@/components/Skeletons/PharmacySliderSkeleton/PharmacySliderSkeleton";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";
import styles from "./page.module.scss";
import {HeaderType} from "@/types/pharmacy";

export default function PharmacyHomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined && !searchQuery) {
      loadMedicinesByCategory(selectedCategory);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      setMedicines([]);
      setLoading(true);
      
      const timer = setTimeout(() => {
        searchMedicines();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      loadMedicinesByCategory(selectedCategory);
    }
  }, [searchQuery]);

  const loadInitialData = async () => {
    setInitialLoading(true);
    try {
      const [categoriesRes, slidersRes] = await Promise.all([
        pharmacyApi.getMedicineCategories(),
        pharmacyApi.getSliderList(),
      ]);

      if (categoriesRes.data) {
        setCategories(categoriesRes.data.data);
        setSelectedCategory((prev) => (prev === null ? null : prev));
      }

      if (slidersRes.data) {
        setSliders(slidersRes.data.data);
      }

      // بارگذاری اولیه داروها
      await loadMedicinesByCategory(null);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const searchMedicines = async () => {
    setLoading(true);
    setPage(1);
    setHasMore(true);

    try {
      const response = await pharmacyApi.getMedicineList({
        title: searchQuery.trim(),
        page: 1
      });

      const allData = response.data.data;
      setMedicines(allData);

      const { current_page, last_page } = response.data.meta;
      setPage(current_page);
      setHasMore(current_page < last_page);
    } catch (error) {
      console.error("Error searching medicines:", error);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMedicinesByCategory = async (categoryId: number | null) => {
    setLoading(true);
    setMedicines([]);
    setPage(1);
    setHasMore(true);

    try {
      const params = categoryId
        ? { category_id: categoryId, page: 1 }
        : { page: 1 };
      const response = await pharmacyApi.getMedicineList(params);

      const allData = response.data.data;
      setMedicines(allData);

      const { current_page, last_page } = response.data.meta;
      setPage(current_page);
      setHasMore(current_page < last_page);
    } catch (error) {
      console.error("Error loading medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const params: MedicineListParams = { page: nextPage };

      if (searchQuery.trim()) {
        params.title = searchQuery.trim();
      } else if (selectedCategory) {
        params.category_id = selectedCategory;
      }

      const response = await pharmacyApi.getMedicineList(params);

      const newData = response.data.data;
      setMedicines((prev) => [...prev, ...newData]);

      const { current_page, last_page } = response.data.meta;
      setPage(current_page);
      setHasMore(current_page < last_page);
    } catch (error) {
      console.error("Error loading more medicines:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, selectedCategory, searchQuery]);

  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isSearchMode = searchQuery.trim().length > 0;

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="داروخانه من" />
      <PharmacySearchSection 
        onCategoriesClick={handleCategoriesClick}
        onSearch={handleSearch}
      />
      
      {!isSearchMode && (
        <>
          {initialLoading ? (
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

      {initialLoading || (medicines.length === 0 && loading) ? (
        <MedicineListSkeleton count={8} />
      ) : (
        <MedicineList
          medicines={medicines}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}