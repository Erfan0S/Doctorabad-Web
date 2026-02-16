"use client";

import styles from "./MobileProductList.module.scss";
import Link from "next/link";
import { Apps } from "@repo/core/types/general";
import Loading from "../../loading";
import MobileProductListItem from "./MobileProductListItem";
import { ProductListItemProps } from "@repo/core/types/props";
import InfiniteScroll from "react-infinite-scroller";

const ProductList = ({
  products,
  app = Apps.BASE,
  fetchNextPage,
  hasNextPage,
  emptyErrorMassage,
}: {
  products?: ProductListItemProps[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  app?: Apps;
  emptyErrorMassage?: string;
}) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.relatedCoursesWrapper}>
        <p style={{ textAlign: "center", padding: "20px" }}>
          {emptyErrorMassage || "هیچ محصولی یافت نشد"}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.relatedCoursesWrapper}>
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading app={app} />}
      >
        {products.map((p) => (
          <Link href={`/${p.baseUrl}/${p.id}`} key={p.id}>
            <MobileProductListItem {...p} />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
