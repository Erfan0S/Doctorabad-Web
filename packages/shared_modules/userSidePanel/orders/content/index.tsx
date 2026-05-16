import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { PackageOrderListItemType } from "../../../../apps/download/types/packages";
import { Loading } from "@repo/shared_modules/components";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { ProductList } from "@repo/shared_modules/components";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { ProductListItemProps } from "@repo/core/types/props";
import { CoinIcon, HomeIcon } from "../../../assets";
import PaperIcon from "../../../assets/svg/paper";
import CalenderCheck from "../../../assets/svg/calenderCheck";

const productData = (
  package_item: PackageOrderListItemType,
): ProductListItemProps => {
  const categoryTitle = package_item.category?.name || "";
  
  return {
    id: package_item.id.toString(),
    title: package_item.title,
    provider: package_item.provider,
    pic_url: package_item.picture,
    baseUrl: "package",
    attributes: [
      {
        icon: <CalenderCheck color="#8b8b8b" fontSize={16} />,
        value: package_item.created_at || null,
      },
      {
        icon: <PaperIcon color="#8b8b8b" fontSize={16} />,
        value: categoryTitle || null,
      },
      {
        icon: <CoinIcon fontSize={16} />,
        value: (
          <>
            <div>
              {package_item.main_price > 0
                ? priceFormatter(package_item.main_price) + " تومن"
                : "رایگان"}
            </div>
          </>
        ),
      },
      {
        icon: <HomeIcon fontSize={16} />,
        value: `${package_item.sell_count} دانشجو`,
      },
    ],
    installmentPayment: package_item.installment_payment,
    lang: package_item.language == 1 ? "Fa" : "En",
  };
};

const SidePanelOrdersContent: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<PackageOrderListItemType[]>
  >({
    queryFn: ({ pageParam }) =>
      api.getPackageOrdersList(Number(pageParam)).then((res) => res.data),
    queryKey: ["orders", "content"],
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.links.next) {
        const url = new URL(lastPage.links.next);
        return Number(url.searchParams.get("page"));
      }
      return undefined;
    },
  });

  const packageDataList = data?.pages.flatMap((page) => page.data);

  if (isLoading) return <Loading size={22} />;

  return (
    <ProductList
      products={packageDataList?.map((item) => productData(item))}
      app={Apps.DOWNLOAD}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      emptyErrorMassage="هیچ سفارشی یافت نشد"
    />
  );
};

export default SidePanelOrdersContent;
