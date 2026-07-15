"use client";
import { api } from "@/api/Api";
import { PageHeader } from "@repo/shared_modules/headers";
import ProviderHeader from "@/components/Header/ProviderHeader";
import { PackageListItemType, ProviderTabs } from "@/types/packages";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import StaticPackageList from "@/components/common/PackageList/StaticPackageList";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import { Apps } from "@repo/core/types/general";
import sanitize from "@repo/core/utils/sanitize";

type Props = {
  id: number;
};

const ProviderPageContent = ({
  tab,
  packages,
  description,
  fetchNextPage,
  hasNextPage,
}: {
  tab: string;
  packages: PackageListItemType[];
  description: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) => {
  switch (tab) {
    case ProviderTabs.PACKAGES:
      return (
        <div className="container">
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loading key={0} app={Apps.DOWNLOAD} />}
          >
            <StaticPackageList packages={packages} />
          </InfiniteScroll>
        </div>
      );
    case ProviderTabs.DESCRIPTION:
      return (
        <div className="w-full p-4">
          <div
            className="text-[16px]"
            dangerouslySetInnerHTML={{ __html: sanitize(description) }}
          />
        </div>
      );
    default:
      return null;
  }
};

const ProviderPage = ({ id }: Props) => {
  const searchParams = useSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["publisherPage", id],
    queryFn: ({ pageParam }) =>
      api.getSingleProvider(id, pageParam as number).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  // Flatten the courses data from all pages and map to PackageListItemType
  const packages = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.data.map((package_item: any) => {
        const category = Array.isArray(package_item.category)
          ? package_item.category
          : package_item.category
            ? [
                {
                  id: package_item.category.id,
                  title: (package_item.category as any).name,
                },
              ]
            : [{ id: 0, title: "" }];

        const mapped: PackageListItemType = {
          id: package_item.id,
          title: package_item.title,
          picture: (package_item as any).picture || "",
          main_price:
            (package_item as any).main_price ??
            (package_item as any).price_main ??
            0,
          off_price:
            (package_item as any).off_price ??
            (package_item as any).price_off ??
            0,
          language: (package_item as any).language ?? 1,
          category: category as [{ id: number; title: string }],
          provider: page.publisher.name || (package_item as any).provider || "",
          sell_count: (package_item as any).sell_count ?? 0,
          download_count: (package_item as any).download_count ?? 0,
          publish_date: (package_item as any).publish_date ?? 0,
          installment_payment:
            (package_item as any).installment_payment ?? false,
        };

        return mapped;
      }),
    );
  }, [data]);

  return isLoading ? (
    <Loading pageLoader app={Apps.DOWNLOAD} />
  ) : (
    <div>
      <PageHeader
        className="[&>div]:last:p-0"
        title="ناشر"
        app={Apps.DOWNLOAD}
        children={
          data && (
            <ProviderHeader
              id={id}
              title={data.pages[0].publisher.name || ""}
              summary={data.pages[0].publisher.summary || ""}
              image={data.pages[0].publisher.picture || ""}
              alt={data.pages[0].publisher.name || ""}
            />
          )
        }
      />
      <ProviderPageContent
        tab={searchParams?.get("tab") || ProviderTabs.PACKAGES}
        packages={packages}
        description={data?.pages[0].publisher.description || ""}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage || false}
      />
    </div>
  );
};
export default ProviderPage;
