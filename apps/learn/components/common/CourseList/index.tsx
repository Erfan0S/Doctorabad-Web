import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@/types/courses";
import { InfiniteData } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { ProductList } from "@repo/shared_modules/components";
import Clock from "@/assets/svg/clock";
import formatDuration from "@/utils/formatDuration";
import { CoinIcon, HomeIcon } from "@repo/shared_modules/icons";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import Hat from "@repo/shared_modules/icons/hat";
import { ProductListItemProps } from "@repo/core/types/props";

interface Props {
  courses:
    | InfiniteData<PaginatedResponse<CourseListItemType[]>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const productData = (
  course: CourseListItemType,
): ProductListItemProps => {
  return {
    id: course.id.toString(),
    title: course.title,
    pic_url: course.pic_url,
    baseUrl: "course",
    attributes: [
      {
        icon: <Clock fontSize={16} />,
        value: `${formatDuration(course.duration)} ساعت`,
      },
      {
        icon: <CoinIcon fontSize={16} />,
        value: course.price_off ? priceFormatter(course.price_off) : null,
      },
      {
        icon: <Hat fontSize={16} />,
        value: course.provider.name,
      },
      {
        icon: <CoinIcon fontSize={16} />,
        value: (
          <>
            <span
              style={{
                textDecoration: course.price_off ? "line-through" : "",
              }}
            >
              {!(course.price_main <= 0)
                ? priceFormatter(course.price_main) + " تومن"
                : "رایگان"}
            </span>
            {course.price_off ? (
              <span>{priceFormatter(course.price_off)} تومن</span>
            ) : null}
          </>
        ),
      },
      {
        icon: <HomeIcon fontSize={16} />,
        value: `${course.student_count} دانشجو`,
      },
    ],
    installmentPayment: course.installment_payment,
    lang: course.language == 1 ? "Fa" : "En",
  };
};

const CourseList = ({ courses, fetchNextPage, hasNextPage }: Props) => {
  const courseData = courses?.pages.flatMap((page) => page.data);

  return (
    <div className={styles.relatedCoursesWrapper}>
      <ProductList
        products={courseData?.map((course) => productData(course))}
        app={Apps.LEARN}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        emptyErrorMassage="هیچ دوره‌ای یافت نشد"
      />
    </div>
  );
};

export default CourseList;
