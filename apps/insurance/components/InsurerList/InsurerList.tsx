// components/InsurerList/InsurerList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Insurer } from "@/types/insurance";
import Loading from "@/components/common/loading";
import InsurerListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";
import InsurerCard from "../InsurerCard/InsurerCard";
import { PersistQueryProvider } from "@repo/shared_modules";

// تعریف اینترفیس برای پارامترهای فیلتر (برای تمیزی کد)
export interface FilterParams {
  field: number | null;
  grade: number | null;
  residency: number | null;
  damageHistory: number | null;
  lastInsurance: number | null;
  lastInsuranceTitle: string | null;
  endDate: string | null;
}

interface InsurerListProps {
  insurers: Insurer[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  // *** اضافه کردن پراپ جدید ***
  filterParams: FilterParams;
}

export default function InsurerList({
  insurers,
  loading,
  hasMore,
  onLoadMore,
  filterParams, // دریافت پراپ
}: InsurerListProps) {
  
  if (insurers.length === 0 && loading) {
    return <InsurerListSkeleton count={6} />;
  }

  return (
    <PersistQueryProvider>
      <InfiniteScroll
        dataLength={insurers.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={
          <div className="flex flex-col items-center justify-center gap-3 py-5">
            <Loading />
          </div>
        }
        className="flex flex-col gap-3 px-[5px] py-4"
      >
        {insurers.map((insurer) => (
          <InsurerCard 
            key={insurer.id} 
            insurer={insurer}  
            searchParams={filterParams} // پاس دادن آبجکت فیلترها به کارت
          />
        ))}
      </InfiniteScroll>
    </PersistQueryProvider>
  );
}
