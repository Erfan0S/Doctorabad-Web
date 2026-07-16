import Image from "next/image";
import Link from "next/link";
import React from "react";
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
  const isFree = !course.price_main;

  const showInstallment = course.installment_payment && !isFree && !isMyCourse;

  return (
    <Link href={`/course/${course.id}`}>
      <div className="flex flex-col items-center justify-center gap-[7px] rounded-xl bg-white p-1 pb-[7px] text-black shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <Image
          className="aspect-video h-[95px] w-[170px] rounded-[10px] bg-cover bg-center object-scale-down"
          src={course.pic_url || placeHolderDataUrl}
          alt={course.title || "دروس"}
          width={170}
          height={95}
          placeholder={placeHolderDataUrl}
        />
        <p className="m-0 line-clamp-2 min-h-[3em] w-full leading-normal">
          {course.title}
        </p>
        {!isMyCourse && (
          <div className="flex min-h-[36px] w-full flex-row items-end justify-end [&>div>div]:justify-start">
            <ProductPrice
              mainPrice={course.price_main}
              amazingPrice={course.price_amazing}
              offPrice={course.price_off}
              app={Apps.LEARN}
              size={14}
            />
            {showInstallment && (
              <ListProductSnappayNotif className="px-[2px] py-[5px] text-[9px] font-semibold" />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseSliderItem;
