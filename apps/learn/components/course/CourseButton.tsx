import React from "react";
import style from "./Course.module.scss";
import { CourseDataType } from "@/types/courses";
import { OrderType } from "@repo/core/types/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { AddToCartButton } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  course: CourseDataType;
  mainPrice: number;
  offPrice?: number | null;
};

export default function CourseButton({ course, mainPrice, offPrice }: Props) {
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
        >
          <>
            <span> شروع یادگیری کل دوره | </span>
            <div>
              <div>
                {/* {discountPercent && <small>٪{discountPercent}</small>} */}
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
            </div>
          </>
        </AddToCartButton>
      )}
      {!!true && (
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
