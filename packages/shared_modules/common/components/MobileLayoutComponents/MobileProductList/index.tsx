"use client";

import Link from "next/link";
import { Apps } from "@repo/core/types/general";
import Loading from "../../loading";
import MobileProductListItem from "./MobileProductListItem";
import { ProductListItemProps } from "@repo/core/types/props";
import InfiniteScroll from "react-infinite-scroller";
import { baseUrls } from "@repo/core/constants/routePath";

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
      <div className="flex flex-col">
        <p style={{ textAlign: "center", padding: "20px" }}>
          {emptyErrorMassage || "هیچ محصولی یافت نشد"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading app={app} />}
      >
        {products.map((p) => {
          const itemApp = p.app || app;
          const productBaseUrl = baseUrls[itemApp] || "";
          return (
            <Link href={`${productBaseUrl}/${p.baseUrl}/${p.id}`} key={p.id}>
              <MobileProductListItem
                {...(app === Apps.DOWNLOAD ? { imageType: "portrait" } : {})}
                {...p}
              />
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
