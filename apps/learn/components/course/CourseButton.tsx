import React from "react";
import style from "./Course.module.scss";
import { CourseDataType } from "@/types/courses";
import { cartActions } from "@repo/core/states/cart";
import { routePath } from "@repo/core/constants/routePath";
import Link from "next/link";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { OrderType } from "@repo/core/types/cart";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import Loading from "../common/Loading";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

type Props = {
  course: CourseDataType;
  orderId?: number | null;
  mainPrice: number;
  offPrice?: number | null;
};

export default function CourseButton({
  course,
  orderId,
  mainPrice,
  offPrice,
}: Props) {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  return (
    <div
      className={`${style.purchaseBar} ${course.user_has_access && style.purchaseBarAccess}`}
    >
      {!!orderId ? (
        <div className={style.addedPurchaseButtonWrapper}>
          <button
            className={style.purchaseButton}
            onClick={() => {
              cartActions.removeFromCart(orderId);
            }}
          >
            حذف از سبد خرید
          </button>
          <Link href={routePath.checkout} className={style.purchaseButton}>
            رفتن به سبد خرید
          </Link>
        </div>
      ) : course.user_has_access ? (
        <span
          className={`${style.purchaseButton} ${style.purchaseButtonActive}`}
        >
          دانشجو این دوره ام!
        </span>
      ) : (
        <button
          className={style.purchaseButton}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(() =>
              cartActions.addToCart(+course.id, OrderType.Course)
            )
          )}
        >
          {updateCartLoading ? (
            <Loading />
          ) : (
            <>
              {" "}
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
          )}
        </button>
      )}
      {course.only_watchable_on_app && (
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
