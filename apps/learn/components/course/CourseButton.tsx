"use client";
import React from "react";
import { CourseDataType } from "@/types/courses";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { Apps } from "@repo/core/types/general";

type Props = {
  course: CourseDataType;
};

const purchaseButtonBase =
  "flex flex-wrap items-center justify-center rounded-lg text-center text-[16px] font-semibold shadow-[0_1px_10px_rgba(0,0,0,0.15)] [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>div]:flex [&>div]:flex-col [&>div]:leading-[13px]";

export function CourseActiveButton({ course }: Props) {
  if (!course.user_has_access && course.price_main) return null;
  return (
    <div
      className={`flex w-full flex-1 flex-row items-center ${course.user_has_access ? "px-4 py-2 [&_button]:p-[7px]" : "px-[15px] py-[10px]"}`}
    >
      <span
        className={`${purchaseButtonBase} flex-1 cursor-default border-none bg-green-base p-[9px] text-white`}
      >
       {!course.price_main ? "رایگان!" : " دانشجوی این دوره‌ام!"}
      </span>
    </div>
  );
}

export const CourseAppOnlyButton = ({ course }: Props) => {
  if (!course.only_watchable_on_app) return null;
  return (
    <div
      className={`${purchaseButtonBase} ms-[10px] h-[45px] w-[75px] flex-none cursor-pointer border-[3px] border-solid border-red bg-white p-[7px] [&>span]:text-[10px] [&>span]:text-red [&_svg]:h-full [&_svg]:w-full [&_svg]:text-red`}
      onClick={() =>
        modalActions.addModal(ModalTypes.AppOnly, { app: Apps.LEARN })
      }
    >
      {/* <PhoneIcon /> */}
      <span>قابل استفاده فقط در اپ</span>
    </div>
  );
};
