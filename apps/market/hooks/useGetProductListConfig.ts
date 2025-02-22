import { api } from "@/api/Api";
import {  PaginatedRequest , ResponseType } from "@repo/core/types/general";


import { ProductListType, Product } from "@repo/core/types/product";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Config = {
  queryFn: (
    params: PaginatedRequest<any>
  ) => Promise<ResponseType<{ data: Product[] }>>;
  params: any;
};

export const useGetProductListConfig = () => {
  const { replace } = useRouter();
  const { type } = useParams();
  const searchParams = useSearchParams();

  const config = useMemo((): Config => {
    switch (type) {
      case ProductListType.ARCHIVE:
        return {
          queryFn: api.getProductList,
          params: {
            sort: searchParams.get("sort") || "newest",
            category: searchParams.get("category") || undefined,
            field: searchParams.get("field") || undefined,
            grade: searchParams.get("grade") || undefined,
            onlyAvailable: searchParams.get("onlyAvailable") || "0",
            provider: searchParams.get("provider") || undefined,
            product_type: searchParams.get("product_type") || undefined,
            min_price: searchParams.get("min_price") || undefined,
            max_price: searchParams.get("max_price") || undefined,
          },
        };
      case ProductListType.SEARCH:
        return {
          params: { q: searchParams.get("search") },
          queryFn: api.searchProducts,
        };
      case ProductListType.AMAZING:
        return { params: {}, queryFn: api.getAmazingProductList };
      case ProductListType.NEWEST:
        return { params: {}, queryFn: api.getNewestProductList };
      case ProductListType.SUGGESTED:
        return { params: {}, queryFn: api.getSuggestedProductList };
      case ProductListType.BEST_SELLING:
        return { params: {}, queryFn: api.getBesSellingProductList };
      case ProductListType.FESTIVAL:
        return {
          params: { id: searchParams.get("festival_id") },
          queryFn: api.getFestivalProductList,
        };
      default:
        replace("/");
        return { params: {}, queryFn: (() => {}) as any };
    }
  }, [replace, searchParams, type]);

  return config;
};
