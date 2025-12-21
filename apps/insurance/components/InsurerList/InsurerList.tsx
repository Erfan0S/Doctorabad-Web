// components/InsurerList/InsurerList.tsx
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Insurer } from "@/types/insurance";
import styles from "./InsurerList.module.scss";
import Loading from "@/components/common/loading";
import InsurerListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";
import InsurerCard from "../InsurerCard/InsurerCard";
import { PersistQueryProvider } from "@repo/shared_modules";

interface InsurerListProps {
  insurers: Insurer[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function InsurerList({
  insurers,
  loading,
  hasMore,
  onLoadMore,
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
          <div className={styles.loadingMore}>
            <Loading />
          </div>
        }
        className={styles.insurerList}
      >
        {insurers.map((insurer) => (
          <InsurerCard key={insurer.id} insurer={insurer} />
        ))}
      </InfiniteScroll>
    </PersistQueryProvider>
  );
}
