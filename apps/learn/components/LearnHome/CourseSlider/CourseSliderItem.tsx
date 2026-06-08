import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./ProductSlider.module.scss";
import { CourseListItemType } from "@/types/courses";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import {
  ListProductSnappayNotif,
  ProductPrice,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  course: CourseListItemType;
  isMyCourse?: boolean;
};

function CourseSliderItem({ course, isMyCourse }: Props) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className={style.courseContainer}>
        <Image
          className={style.course}
          src={course.pic_url || placeHolderDataUrl}
          alt={course.title || "دروس"}
          width={170}
          height={95}
          placeholder={placeHolderDataUrl}
        />
        <p>{course.title}</p>
        {!isMyCourse && (
          <div>
            <ProductPrice
              mainPrice={course.price_main}
              amazingPrice={course.price_amazing}
              offPrice={course.price_off}
              app={Apps.LEARN}
            />
            {course.installment_payment && (
              <ListProductSnappayNotif className={style.listSnappayNotif} />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseSliderItem;
