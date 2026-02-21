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

  const initialSearch = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearch);

  const isSearchMode = searchQuery.length > 0;

  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (currentQ !== debouncedSearchQuery) {
      setSearchQuery(currentQ);
      setDebouncedSearchQuery(currentQ);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchQuery) {
      if (params.get("q") !== debouncedSearchQuery) {
        params.set("q", debouncedSearchQuery);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    } else {
      if (params.has("q")) {
        params.delete("q");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  }, [debouncedSearchQuery, pathname, router]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.HOME} title="داروخانه من" onBackClick={isSearchMode ? handleClearSearch : undefined} />
      <PharmacySearchSection
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
        searchQuery={searchQuery}
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

