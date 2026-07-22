"use client";

import { api } from "@/api/Api";
import Loading from "@/components/common/loading";
import {
  ClinicItem,
  CourseItem,
  ExamItem,
  GlobalSearchItem,
  MedicineItem,
  PackageItem,
  ShopProductItem,
} from "@/types/globalSerach";
import { Apps } from "@repo/core/types/general";
import { ProductListItemProps } from "@repo/core/types/props";
import { ProductListItem } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { SearchProductType } from "@/types/globalSerach";
import DownArrow from "@/assets/svg/downArrow";
import UpArrow from "@/assets/svg/upArrow";
import FIlterNotFound from "../../common/FIlterNotFound";
import Link from "next/link";
import {
  baseUrls,
  learnPaths,
  examPaths,
  downloadPaths,
  marketPaths,
  clinicPaths,
  pharmacyPaths,
} from "@repo/core/constants/routePath";

const SearchPageComponent = () => {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const { data, isError, isLoading } = useQuery<{ data: GlobalSearchItem }>({
    queryKey: ["search", query],
    queryFn: async () => (await api.globalSearch(query)).data,
    enabled: Boolean(query),
    retry: false,
  });

  const sections = [
    {
      key: "shopProduct" as const,
      title: "دکترمارکت",
      items: data?.data?.shopProduct?.items ?? [],
      mapItem: mapShopProductToListItem,
      app: Apps.MARKET,
      showSeeMore: Boolean(data?.data?.shopProduct?.see_more),
      baseUrl: baseUrls.market + marketPaths.single,
    },
    {
      key: "course" as const,
      title: "مرکزآموزش",
      items: data?.data?.course?.items ?? [],
      mapItem: mapCourseToListItem,
      app: Apps.LEARN,
      showSeeMore: Boolean(data?.data?.course?.see_more),
      baseUrl: baseUrls.learn + learnPaths.single,
    },
    {
      key: "package" as const,
      title: "مرکزمحتوا",
      items: data?.data?.package?.items ?? [],
      mapItem: mapPackageToListItem,
      app: Apps.DOWNLOAD,
      showSeeMore: Boolean(data?.data?.package?.see_more),
      baseUrl: baseUrls.download + downloadPaths.single,
    },
    {
      key: "exam" as const,
      title: "مرکزآزمون",
      items: data?.data?.exam?.items ?? [],
      mapItem: mapExamToListItem,
      app: Apps.EXAM,
      showSeeMore: Boolean(data?.data?.exam?.see_more),
      baseUrl: baseUrls.exam + examPaths.single,
    },
    {
      key: "medicine" as const,
      title: "داروخانه‌من",
      items: data?.data?.medicine?.items ?? [],
      mapItem: mapMedicineToListItem,
      app: Apps.PHARMACY,
      showSeeMore: Boolean(data?.data?.medicine?.see_more),
      baseUrl: baseUrls.pharmacy + pharmacyPaths.single,
    },
    {
      key: "clinic" as const,
      title: "کلینیک‌‌‌‌من",
      items: data?.data?.clinic?.items ?? [],
      mapItem: mapClinicToListItem,
      app: Apps.CLINIC,
      showSeeMore: Boolean(data?.data?.clinic?.see_more),
      baseUrl: baseUrls.clinic + clinicPaths.single,
    },
  ];

  const hasResults = sections.some((section) => section.items.length > 0);

  const [moreItems, setMoreItems] = useState<Record<string, any[]>>({});
  const [loadingMore, setLoadingMore] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  useEffect(() => {
    setMoreItems({});
    setExpandedSections({});
    setLoadingMore({});
  }, [query]);

  const handleSeeMore = useCallback(
    async (sectionKey: SearchProductType) => {
      if (expandedSections[sectionKey]) {
        setExpandedSections((s) => ({ ...s, [sectionKey]: false }));
        return;
      }

      setLoadingMore((s) => ({ ...s, [sectionKey]: true }));
      try {
        const res = await api.subSearch(query, sectionKey);

        const payload = (res as any)?.data ?? res;
        const items =
          payload?.data?.items ??
          payload?.items ??
          (Array.isArray(payload?.data) ? payload.data : null) ??
          (Array.isArray(payload) ? payload : []);

        setMoreItems((s) => ({ ...s, [sectionKey]: items }));
        setExpandedSections((s) => ({ ...s, [sectionKey]: true }));
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMore((s) => ({ ...s, [sectionKey]: false }));
      }
    },
    [expandedSections, query],
  );

  const handleResultClick = useCallback(
    (productType: SearchProductType, productId: number | string) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) return;

      void api.storeSearchHistory(trimmedQuery);
      void api.storePopularSearch({
        product_id: Number(productId),
        product_type: productType,
      });
    },
    [query],
  );

  if (!query) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !hasResults) {
    if (query.length < 3) return null;
    return <FIlterNotFound />;
  }

  return (
    <div className="container">
      {sections.map((section) => {
        const fetched = moreItems[section.key];
        const hasInitial = section.items && section.items.length > 0;
        const hasFetched = fetched && fetched.length > 0;
        const isExpanded = Boolean(expandedSections[section.key]);

        if (!hasInitial && !hasFetched) return null;

        const itemsToRender =
          hasFetched && isExpanded ? fetched : section.items;

        return (
          <div
            key={section.key}
            className="border-solid border-[#dddddd] border-0 border-b py-[15px]"
          >
            <h2
              className={`mb-3 text-[20px] font-bold text-app-base ${section.app}`}
            >
              {section.title}
            </h2>
            {itemsToRender.map((item) => (
              <Link
                href={`${section.baseUrl}/${item.id}`}
                key={item.id}
                onClick={() => handleResultClick(section.key, item.id)}
              >
                <ProductListItem
                  key={item.id}
                  {...section.mapItem(item as never)}
                  app={section.app}
                />
              </Link>
            ))}

            {section.showSeeMore && (hasInitial || hasFetched) && (
              <>
                <div
                  className={`mt-2 flex cursor-pointer items-center justify-center pb-2.5 text-sm font-bold text-app-base ${section.app}`}
                  onClick={() =>
                    handleSeeMore(section.key as SearchProductType)
                  }
                >
                  {loadingMore[section.key]
                    ? "در حال بارگذاری..."
                    : isExpanded
                      ? "مشاهده کمتر"
                      : "مشاهده بیشتر"}
                  {isExpanded ? <UpArrow /> : <DownArrow />}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
const mapShopProductToListItem = (
  item: ShopProductItem,
): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title,
  pic_url: item.product_pic ?? undefined,
  price_main: item.price_main ?? undefined,
  price_off: item.price_off ?? undefined,
  installmentPayment: item.installment_payment,
  imageType: "square",
  app: Apps.MARKET,
});

const mapCourseToListItem = (item: CourseItem): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title,
  pic_url: item.pic_url ?? undefined,
  price_main: item.price_main ?? undefined,
  price_off: item.price_off ?? undefined,
  installmentPayment: item.installment_payment,
  imageType: "landscape",
  app: Apps.LEARN,
});

const mapPackageToListItem = (item: PackageItem): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title,
  pic_url: item.picture ?? undefined,
  price_main: item.main_price ?? undefined,
  price_off: item.off_price ?? undefined,
  installmentPayment: item.installment_payment,
  imageType: "portrait",
  app: Apps.DOWNLOAD,
});

const mapExamToListItem = (item: ExamItem): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title,
  pic_url: item.picture ?? undefined,
  price_main: item.main_price ?? undefined,
  price_off: item.off_price ?? undefined,
  installmentPayment: item.installment_payment,
  imageType: "square",
  app: Apps.EXAM,
});

const mapMedicineToListItem = (item: MedicineItem): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title_fa || item.title_en,
  pic_url: item.picture ?? undefined,
  imageType: "square",
  app: Apps.PHARMACY,
  haveStock: false,
});

const mapClinicToListItem = (item: ClinicItem): ProductListItemProps => ({
  id: item.id.toString(),
  title: item.title_fa || item.title_en,
  pic_url: item.picture ?? undefined,
  imageType: "square",
  app: Apps.CLINIC,
  haveStock: false,
});

export default SearchPageComponent;
