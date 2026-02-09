// components/MedicineList/MedicineList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Medicine } from "@/types/pharmacy";
import MedicineCard from "../MedicineCard/MedicineCard";
import styles from "./MedicineList.module.scss";
import Loading from "@/components/common/loading";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";

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
    return <MedicineListSkeleton count={6} />;
  }

  return (
    <InfiniteScroll
      dataLength={medicines.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        <div className={styles.loadingMore}>
          <Loading />
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