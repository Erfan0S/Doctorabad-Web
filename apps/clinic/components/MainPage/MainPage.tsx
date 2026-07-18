// app/clinic/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import ClinicSearchSection from "@/components/ClinicSearchSection/ClinicSearchSection";
import { HeaderType } from "@/types/clinic";
import ClinicSliderSection from "@/components/ClinicSlider/ClinicSliderSection";
import CategoryTabsSection from "@/components/CategoryTabs/CategoryTabsSection";
import DiseaseListSection from "@/components/DiseaseList/DiseaseListSection";

export default function ClinicHomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const diseaseListRef = useRef<HTMLDivElement>(null);

  const initialSearch = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(initialSearch);

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

  const handleCategorySelectAndScroll = (categoryId: number | null) => {
    setSelectedCategory(categoryId);

    if (diseaseListRef.current) {
      const listPosition = diseaseListRef.current.getBoundingClientRect().top;
      const headerAndTabsHeight = 170;

      const scrollToY = listPosition + window.scrollY - headerAndTabsHeight;

      window.scrollTo({
        top: scrollToY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <ClinicHeader
        headerPageType={HeaderType.HOME}
        title="کلینیک من"
        onBackClick={isSearchMode ? handleClearSearch : undefined}
      />
      <ClinicSearchSection
        onSearchChange={setSearchQuery}
        onSearchDebounced={setDebouncedSearchQuery}
        searchQuery={searchQuery}
      />

      {!isSearchMode && (
        <>
          <ClinicSliderSection />
          <CategoryTabsSection
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelectAndScroll}
          />
        </>
      )}

      <div ref={diseaseListRef}>
        <DiseaseListSection
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          debouncedSearchQuery={debouncedSearchQuery}
        />
      </div>
    </div>
  );
}
