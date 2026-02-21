// app/clinic/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // اضافه شده
import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import ClinicSearchSection from "@/components/ClinicSearchSection/ClinicSearchSection";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/clinic";
import ClinicSliderSection from "@/components/ClinicSlider/ClinicSliderSection";
import CategoryTabsSection from "@/components/CategoryTabs/CategoryTabsSection";
import DiseaseListSection from "@/components/DiseaseList/DiseaseListSection";


export default function ClinicHomePage() {
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
      <ClinicHeader headerPageType={HeaderType.OTHERS} title="کلینیک من" />
      <ClinicSearchSection
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
        initialValue={initialSearch} 
      />

      {!isSearchMode && (
        <>
          <ClinicSliderSection />
          <CategoryTabsSection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </>
      )}

      <DiseaseListSection
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        debouncedSearchQuery={debouncedSearchQuery}
      />
    </div>
  );
}