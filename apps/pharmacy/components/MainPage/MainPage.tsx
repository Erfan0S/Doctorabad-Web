// app/pharmacy/page.tsx
"use client";

import { useState } from "react";
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import PharmacySearchSection from "@/components/PharmacySearchSection/PharmacySearchSection";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/pharmacy";
import PharmacySliderSection from "@/components/PharmacySlider/PharmacySliderSection";
import CategoryTabsSection from "@/components/CategoryTabs/CategoryTabsSection";
import MedicineListSection from "@/components/MedicineList/MedicineListSection";


export default function PharmacyHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  
  const isSearchMode = searchQuery.length > 0;

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="داروخانه من" />
      <PharmacySearchSection 
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
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