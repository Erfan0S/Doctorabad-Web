"use client";
import { api } from "@/api/Api";
import { FilterParams, sortByConfigs } from "@/constants/filter";
import { SelectQroupItemType } from "@repo/core/types/filter";
import { Apps } from "@repo/core/types/general";
import {
  OptionSwitch,
  SelectFilterQroup,
} from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { MinMaxPrice } from "./minMaxPrice";

function MobileFilterContainer() {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategoriesList(),
  });

  const { data: providers, isLoading: isProvidersLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => api.getProviders(),
  });

  const { data: productTypes, isLoading: isProductTypesLoading } = useQuery({
    queryKey: ["product-types"],
    queryFn: () => api.getProductTypes(),
  });

  const { data: priceRange, isLoading: isPriceRangeLoading } = useQuery({
    queryKey: ["product-price-range"],
    queryFn: () => api.getProductPriceRange(),
  });

  //   const { data: fields, isLoading: isFieldsLoading } = useQuery({
  //     queryKey: ["fields", 5],
  //     queryFn: () => api.getFields(5),
  //   });

  //   const searchParams = useSearchParams();
  //   const fieldFilter = searchParams?.get(FilterParams.Field);

  //   const { data: grades, isLoading: isGradesLoading } = useQuery({
  //     queryFn: () => api.getGrades(Number(fieldFilter), 5),
  //     queryKey: ["grades", fieldFilter],
  //     enabled: !!fieldFilter,
  //     staleTime: Infinity,
  //   });

  const items: SelectQroupItemType[] = [
    {
      data: categories?.data.map((c) => ({
        id: c.id,
        title: c.title,
      })),
      title: "دسته‌بندی",
      isActive: true,
      loading: isCategoriesLoading,
      name: FilterParams.Category,
    },
    // {
    //   data: fields?.data.data.map((f) => ({
    //     id: f.id,
    //     title: f.title,
    //   })),
    //   title: "رشته",
    //   isActive: true,
    //   loading: isFieldsLoading,
    //   name: FilterParams.Field,
    //   dependencies: [FilterParams.Grade],
    // },
    // {
    //   data: grades?.data.data.map((p) => ({
    //     id: p.id,
    //     title: p.title,
    //   })),
    //   title: "موضوع",
    //   isActive: !!fieldFilter,
    //   loading: isGradesLoading,
    //   name: FilterParams.Grade,
    // },
    {
      data: providers?.data.data.map((p) => ({
        id: p.id,
        title: p.name,
      })),
      title: "فروشنده",
      isActive: true,
      loading: isProvidersLoading,
      name: FilterParams.Provider,
    },
    {
      data: [],
      title: "بازه قیمت",
      isActive: !!priceRange?.data.data,
      loading: isPriceRangeLoading,
      customContent: (
        <div style={{ padding: "2rem", paddingBottom: "4rem" }}>
          <MinMaxPrice
            priceRange={priceRange?.data.data as { min: number; max: number }}
            extandable={false}
          />
        </div>
      ),
    },
    // TODO: continue here and add sort and only available filter
    // {
    //   data: productTypes?.data.data.map((p) => ({
    //     id: p.id,
    //     title: p.title,
    //   })),
    //   title: "نوع محصول",
    //   isActive: true,
    //   loading: isProductTypesLoading,
    //   name: FilterParams.ProductType,
    // },
    {
      data: sortByConfigs.map((p) => ({
        id: p.value,
        title: p.title,
      })),
      title: "بر اساس",
      isActive: true,
      loading: false,
      name: FilterParams.Sort,
      defaultValue: "newest",
    },
  ];

  return (
    <div className="container">
      <SelectFilterQroup app={Apps.MARKET} items={items} />
      <div style={{ marginTop: "10px" }}>
        <OptionSwitch
          name={FilterParams.OnlyAvailable}
          title="فقط کالا‌های موجود"
          app={Apps.MARKET}
          addToQuery
        />
      </div>
    </div>
  );
}

export default MobileFilterContainer;
