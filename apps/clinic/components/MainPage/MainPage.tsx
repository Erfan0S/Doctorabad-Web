// app/clinic/page.tsx
"use client";

import { useState } from "react";
import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import ClinicSearchSection from "@/components/ClinicSearchSection/ClinicSearchSection";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/clinic";
import ClinicSliderSection from "@/components/ClinicSlider/ClinicSliderSection";
import CategoryTabsSection from "@/components/CategoryTabs/CategoryTabsSection";
import DiseaseListSection from "@/components/DiseaseList/DiseaseListSection";


export default function ClinicHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const isSearchMode = searchQuery.length > 0;

  return (
    <div className={styles.container}>
      <ClinicHeader headerPageType={HeaderType.OTHERS} title="کلینیک من" />
      <ClinicSearchSection
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
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