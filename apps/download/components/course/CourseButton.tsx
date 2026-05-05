"use client";
import React from "react";
import style from "./Course.module.scss";
import { PackageItem } from "@/types/courses";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

type Props = {
  course: PackageItem;
};

export function CourseActiveButton({ course }: Props) {
  if (!course.user_has_access) return null;
  return (
    <div
      className={`${style.purchaseButtonWrapper} ${course.user_has_access && style.purchaseBarAccess}`}
    >
      <span className={`${style.purchaseButton} ${style.purchaseButtonActive}`}>
        شما به این پکیج دسترسی دارید!
      </span>
    </div>
  );
}

export const CourseAppOnlyButton = ({ course }: Props) => {
  if (!course.only_usable_on_app) return null;
  return (
    <div
      className={`${style.appOnly} ${style.purchaseButton}`}
      onClick={() => modalActions.addModal(ModalTypes.AppOnly)}
    >
      {/* <PhoneIcon /> */}
      <span>قابل استفاده فقط در اپ</span>
    </div>
  );
};
