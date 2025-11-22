// components/DiseaseList/DiseaseList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Disease } from "@/types/clinic";
import styles from "./DiseaseList.module.scss";
import Loading from "@/components/common/loading";
import DiseaseListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";
import DiseaseCard from "../DiseaseCard/DiseaseCard";

interface DiseaseListProps {
  diseases: Disease[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function DiseaseList({ 
  diseases, 
  loading, 
  hasMore, 
  onLoadMore 
}: DiseaseListProps) {
  if (diseases.length === 0 && loading) {
    return <DiseaseListSkeleton count={6} />;
  }

  return (
    <InfiniteScroll
      dataLength={diseases.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        <div className={styles.loadingMore}>
          <Loading />
        </div>
      }
      className={styles.diseasesList}
    >
      {diseases.map((disease) => (
        <DiseaseCard key={disease.id} disease={disease} />
      ))}
    </InfiniteScroll>
  );
}