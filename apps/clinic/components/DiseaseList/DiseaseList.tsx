// components/DiseaseList/DiseaseList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Disease } from "@/types/clinic";
import Loading from "@/components/common/loading";
import DiseaseListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";
import DiseaseCard from "../DiseaseCard/DiseaseCard";
import { PersistQueryProvider } from "@repo/shared_modules";

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
        <div className="flex flex-col items-center justify-center gap-3 py-5">
          <Loading />
        </div>
      }
      className="clinic-disease-list"
      >
      {diseases.map((disease) => (
        <DiseaseCard key={disease.id} disease={disease} />
      ))}
    </InfiniteScroll>
  );
}