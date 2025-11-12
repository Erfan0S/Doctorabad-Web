// app/pharmacy/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { pharmacyApi } from "@/api/Api";
import { Medicine, MedicineCategory, Slider } from "@/types/pharmacy";
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import PharmacySlider from "@/components/PharmacySlider/PharmacySlider";
import PharmacySearchSection from "@/components/PharmacySearchSection/PharmacySearchSection";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import MedicineList from "@/components/MedicineList/MedicineList";
import styles from "./page.module.scss";


export default function PharmacyHomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [allMedicines, setAllMedicines] = useState<Medicine[]>([]);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

useEffect(() => {
  if (selectedCategory !== undefined) {
    loadMedicinesByCategory(selectedCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [selectedCategory]);


  const loadInitialData = async () => {
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
    } catch (error) {
      console.error("Error loading initial data:", error);
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
      const params = selectedCategory
        ? { category_id: selectedCategory, page: nextPage }
        : { page: nextPage };

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
  }, [loading, hasMore, page, selectedCategory]);

  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={styles.container}>
      <PharmacyHeader title="داروخانه من" />
      <PharmacySearchSection onCategoriesClick={handleCategoriesClick} />
      <PharmacySlider sliders={sliders} />
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <MedicineList
        medicines={medicines}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
}
