import React from "react";
import { CourseListItemType } from "@repo/core/types/course";
import { InfiniteData } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { ProductList, ProductPrice } from "@repo/shared_modules/components";
import Clock from "@repo/shared_modules/icons/clock";
import formatDuration from "@repo/core/utils/formatDuration";
import { CoinIcon, HomeIcon } from "@repo/shared_modules/icons";
import Hat from "@repo/shared_modules/icons/hat";
import { ProductListItemProps } from "@repo/core/types/props";

type ExtendedCourseListItemType = CourseListItemType & {
  installment_payment?: boolean;
};

interface Props {
  courses:
    | InfiniteData<PaginatedResponse<ExtendedCourseListItemType[]>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const productData = (
  course: ExtendedCourseListItemType,
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
        icon: <Hat fontSize={16} />,
        value: course.provider.name,
      },
      {
        icon: <HomeIcon fontSize={16} />,
        value: `${course.student_count} دانشجو`,
      },
      {
        icon: <CoinIcon fontSize={16} />,
        value: (
          <ProductPrice
            mainPrice={course.price_main}
            offPrice={course.price_off}
            amazingPrice={course.price_amazing}
            app={Apps.LEARN}
            className="[&_span]:leading-[13px]"
            size={12}
          />
        ),
      },
    ],
    installmentPayment: course.installment_payment,
    lang: course.language == 1 ? "Fa" : "En",
    imageType: "landscape",
  };
};

const CourseList = ({ courses, fetchNextPage, hasNextPage }: Props) => {
  const courseData = courses?.pages.flatMap((page) => page.data);

  return (
    <div className="flex flex-col">
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
