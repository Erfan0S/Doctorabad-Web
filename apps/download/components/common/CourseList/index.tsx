import React from "react";
import styles from "./CourseList.module.scss";
import { PackageListItemType } from "@/types/courses";
import { InfiniteData } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { ProductList } from "@repo/shared_modules/components";
import Clock from "@/assets/svg/clock";
import formatDuration from "@/utils/formatDuration";
import { CoinIcon, HomeIcon } from "@repo/shared_modules/icons";
import CalenderIcon from "@/assets/svg/calender";
import DownloadIcon from "@/assets/svg/download";
import CategoryIcon from "@/assets/svg/category";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import Hat from "@repo/shared_modules/icons/hat";
import { ProductListItemProps } from "@repo/core/types/props";

interface Props {
  courses:
    | InfiniteData<PaginatedResponse<PackageListItemType[]>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const productData = (
  package_item: PackageListItemType,
): ProductListItemProps => {
  return {
    id: package_item.id.toString(),
    title: <>
      {package_item.title}
      <br />
      <span style={{ fontSize: '0.8em', color: '#666' }}>{package_item.provider}</span>
    </>,
    provider: package_item.provider,
    pic_url: package_item.picture,
    baseUrl: "course",
    attributes: [

      {
        icon: <CalenderIcon color="#8b8b8b" fontSize={16} />,
        value: `${package_item.publish_date ? package_item.publish_date : null}`,
      },
      {
        icon: <CategoryIcon color="#8b8b8b" fontSize={16} />,
        value: `${package_item.category[0]?.title}`,
      },
      {
        icon: <CoinIcon fontSize={16} />,
        value: (
          <>
            <div
              style={{
                textDecoration: package_item.off_price ? "line-through" : "",
              }}
            >
              {!(package_item.main_price <= 0)
                ? priceFormatter(package_item.main_price) + " تومن"
                : "رایگان"}
            </div>
            {package_item.off_price ? (
              <span style={{ color: "#006797" }}>
                {priceFormatter(package_item.off_price)} تومن
              </span>
            ) : null}
          </>
        ),
      },
      {
        icon:
        
                  <>
            {package_item.main_price
              ? <HomeIcon  fontSize={16} />
              : <DownloadIcon color="#8b8b8b" fontSize={16} />}
          </>,
        value: (
          <>
            {package_item.main_price
              ? `${package_item.sell_count} دانشجو`
              : `${package_item.download_count} دانلود`}
          </>
        ),
      },
    ],
    installmentPayment: package_item.installment_payment,
    lang: package_item.language == 1 ? "Fa" : "En",
  };
};

const CourseList = ({ courses, fetchNextPage, hasNextPage }: Props) => {
  const courseData = courses?.pages.flatMap((page) => page.data);

  return (
    <div className={styles.relatedCoursesWrapper}>
      <ProductList
        products={courseData?.map((course) => productData(course))}
        app={Apps.DOWNLOAD}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        emptyErrorMassage="هیچ دوره‌ای یافت نشد"
      />
    </div>
  );
};

export default CourseList;
