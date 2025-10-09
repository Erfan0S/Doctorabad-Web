import React from "react";
import style from "./Course.module.scss";
import { CourseDataType } from "@/types/courses";
import { OrderType } from "@repo/core/types/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { AddToCartButton } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import AmazingStarIcon from "@/assets/svg/amazingStart";

type Props = {
  course: CourseDataType;
  mainPrice: number;
  offPrice?: number | null;
};

export default function CourseButton({ course, mainPrice, offPrice }: Props) {
  const { discountPercent } = getDiscountInformation(
    course?.price_main,
    course?.price_off || undefined,
    course?.price_amazing || undefined
  );

  return (
    <div
      className={`${style.purchaseBar} ${course.user_has_access && style.purchaseBarAccess}`}
    >
      {course.user_has_access ? (
        <span
          className={`${style.purchaseButton} ${style.purchaseButtonActive}`}
        >
          دانشجو این دوره ام!
        </span>
      ) : (
        <AddToCartButton
          id={+course.id}
          type={OrderType.Course}
          app={Apps.LEARN}
          isFullWidth
          className={`${style.addToCartButton} ${!!offPrice && style.priceOffWrapper}`}
        >
          <div>
            <div>
              {!!discountPercent && (
                <div className={style.purcheseBarDiscountPercent}>
                  <div>
                    <AmazingStarIcon />
                    <span>%{discountPercent}</span>
                  </div>
                </div>
              )}{" "}
              {offPrice && (
                <span className={style.priceOff}>
                  {priceFormatter(mainPrice)}
                  تومن
                </span>
              )}
            </div>
            <div>
              {priceFormatter(offPrice || mainPrice)}
              تومن
            </div>
          </div>{" "}
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;افزودن به سبد خرید</span>
        </AddToCartButton>
      )}
      {!!course.only_watchable_on_app && (
        <div
          className={`${style.appOnly} ${style.purchaseButton}`}
          onClick={() => modalActions.addModal(ModalTypes.AppOnly)}
        >
          {/* <PhoneIcon /> */}
          <span>قابل استفاده فقط در اپ</span>
        </div>
      )}
    </div>
  );
}
