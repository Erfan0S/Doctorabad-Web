// app/pharmacy/page.tsx
"use client";

import { useState } from "react";
import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/pharmacy";
import AlvardoPage from "../ApgarPage/ApgarPage";



export default function PharmacyHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  
  const isSearchMode = searchQuery.length > 0;

  return (
    <div className={styles.container}>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="الورادو" />

    <AlvardoPage />

    </div>
  );
}