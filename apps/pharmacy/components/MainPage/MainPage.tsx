// app/pharmacy/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import PharmacySearchSection from "@/components/PharmacySearchSection/PharmacySearchSection";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/pharmacy";
import PharmacySliderSection from "@/components/PharmacySlider/PharmacySliderSection";
import CategoryTabsSection from "@/components/CategoryTabs/CategoryTabsSection";
import MedicineListSection from "@/components/MedicineList/MedicineListSection";


export default function PharmacyHomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // دریافت مقدار اولیه از URL
  const initialSearch = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch); // مقدار اولیه
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearch); // مقدار اولیه
  
  const isSearchMode = searchQuery.length > 0;

    // همگام‌سازی URL با مقدار جستجو
    useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (debouncedSearchQuery) {
        params.set("q", debouncedSearchQuery);
      } else {
        params.delete("q");
      }
  
      // استفاده از replace برای جلوگیری از ایجاد تاریخچه اضافی هنگام تایپ
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedSearchQuery, pathname, router]);
  

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="داروخانه من" />
      <PharmacySearchSection 
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
        initialValue={initialSearch} 
      />
      
      {!isSearchMode && (
        <>
          <PharmacySliderSection />
          <CategoryTabsSection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </>
      )}

      <MedicineListSection
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        debouncedSearchQuery={debouncedSearchQuery}
        />
    </div>
  );
}

