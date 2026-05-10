import React from "react";
import { CourseTabsData } from "./tabs/tabs-data";
import { PackageItem, CourseTab } from "@/types/courses";
import { Apps } from "@repo/core/types/general";
import { MobileProductLayout } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { CourseActiveButton, CourseAppOnlyButton } from "./CourseButton";
import Image from "next/image";
import CourseHeaderSiffix from "../Header/courseHeaderSuffix";

type Props = {
  course: PackageItem;
  lessonParam?: string | null;
  activeTab?: string;
};

const Course = ({ course, activeTab }: Props) => {
  const tabsData = CourseTabsData({
    course,
  });

  return (
    <MobileProductLayout
      tabsData={tabsData}
      tabParam={activeTab || CourseTab.SPECIFICATIONS}
      app={Apps.DOWNLOAD}
      preview={
        <div
          style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
        >
          <Image
            src={course.picture}
            alt={course.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      }
      title={course.title}
      headerSuffix={<CourseHeaderSiffix course={course} />}
      provider={{
        name: course.authors?.[0]?.title || "",
        img_url: course.provider_picture,
        id: course.provider_id,
      }}
      productButtonProps={{
        installment_payment: course.user_has_access
          ? false
          : course.installment_payment,
        installment_text: course.installment_text || undefined,
        mainPrice: course.main_price ?? 0,
        offPrice: course.off_price,
        productId: course.id,
        orderType: OrderType.Package,
        app: Apps.DOWNLOAD,
        replaceButton: (course.user_has_access ||
          course.main_price == null) && <CourseActiveButton course={course} />,
        children: <CourseAppOnlyButton course={course} />,
      }}
    />
  );
};

export default Course;
