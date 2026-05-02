import { api } from "@/api/Api";
import { FilterParams } from "@/constants/filter";
import { PaginatedRequest, ResponseType } from "@repo/core/types/general";

import { ProductListType, Product } from "@repo/core/types/product";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Config = {
  queryFn: (
    params: PaginatedRequest<any>,
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
            [FilterParams.Sort]:
              searchParams?.get(FilterParams.Sort) || "newest",
            [FilterParams.Category]:
              searchParams?.get(FilterParams.Category) || undefined,
            [FilterParams.Field]:
              searchParams?.get(FilterParams.Field) || undefined,
            [FilterParams.Grade]:
              searchParams?.get(FilterParams.Grade) || undefined,
            [FilterParams.OnlyAvailable]:
              searchParams?.get(FilterParams.OnlyAvailable) || "0",
            [FilterParams.Provider]:
              searchParams?.get(FilterParams.Provider) || undefined,
            [FilterParams.ProductType]:
              searchParams?.get(FilterParams.ProductType) || undefined,
            [FilterParams.MinPrice]:
              searchParams?.get(FilterParams.MinPrice) || undefined,
            [FilterParams.MaxPrice]:
              searchParams?.get(FilterParams.MaxPrice) || undefined,
          },
        };
      case ProductListType.SEARCH:
        return {
          params: { q: searchParams?.get(FilterParams.SEARCH) },
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
          params: { id: searchParams?.get("festival_id") },
          queryFn: api.getFestivalProductList,
        };
      default:
        replace("/");
        return { params: {}, queryFn: (() => {}) as any };
    }
  }, [replace, searchParams, type]);

  return config;
};
