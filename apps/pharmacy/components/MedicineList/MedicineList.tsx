// components/MedicineList/MedicineList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Medicine } from "@/types/pharmacy";
import MedicineCard from "../MedicineCard/MedicineCard";
import styles from "./MedicineList.module.scss";

interface MedicineListProps {
  medicines: Medicine[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function MedicineList({ 
  medicines, 
  loading, 
  hasMore, 
  onLoadMore 
}: MedicineListProps) {
  if (medicines.length === 0 && loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={medicines.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        <div className={styles.loadingMore}>
          <div className={styles.spinner}></div>
          <p>در حال بارگذاری...</p>
        </div>
      }
      className={styles.medicinesList}
    >
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </InfiniteScroll>
  );
}