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

const PAGE_SIZE = 10;

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
    if (selectedCategory) {
      loadMedicinesByCategory(selectedCategory);
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
        if (categoriesRes.data.data.length > 0) {
          setSelectedCategory(categoriesRes.data.data[0].id);
        }
      }

      if (slidersRes.data) {
        setSliders(slidersRes.data.data);
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const loadMedicinesByCategory = async (categoryId: number) => {
    setLoading(true);
    setPage(1);
    setMedicines([]);
    
    try {
      const response = await pharmacyApi.getMedicineTreatments(categoryId);
      if (response.data) {
        const allData = response.data.data as any[];
        setAllMedicines(allData);
        
        const firstPage = allData.slice(0, PAGE_SIZE);
        setMedicines(firstPage);
        setHasMore(allData.length > PAGE_SIZE);
      }
    } catch (error) {
      console.error("Error loading medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    
    const nextMedicines = allMedicines.slice(startIndex, endIndex);
    
    if (nextMedicines.length > 0) {
      setMedicines(prev => [...prev, ...nextMedicines]);
      setPage(nextPage);
      setHasMore(endIndex < allMedicines.length);
    } else {
      setHasMore(false);
    }
  }, [loading, hasMore, page, allMedicines]);

  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={styles.container}>
      <PharmacyHeader title="داروخانه من"  />
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