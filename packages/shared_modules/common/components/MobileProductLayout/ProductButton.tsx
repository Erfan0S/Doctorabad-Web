import style from "./Course.module.scss";
import { OrderType } from "@repo/core/types/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import {
  AddToCartButton,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import AmazingStarIcon from "../../../assets/svg/amazingStart";

export type ProductButtonProps = {
  mainPrice: number;
  offPrice?: number | null;
  amazingPrice?: number | null;
  replaceButton?: React.ReactNode;
  children: React.ReactNode;
  installment_payment: boolean;
  installment_text: string;
  orderType: OrderType;
  productId: number;
  app?: Apps;
};

export default function ProductButton({
  mainPrice,
  offPrice,
  amazingPrice,
  replaceButton,
  children,
  installment_payment,
  installment_text,
  app,
  productId,
  orderType,
}: ProductButtonProps) {
  const { discountPercent } = getDiscountInformation(
    mainPrice,
    offPrice || undefined,
    amazingPrice || undefined,
  );

  return (
    <div className={`${style.purchaseBar}`}>
      {installment_payment && installment_text && (
        <ProductSnappayNotif
          text={installment_text}
          className={style.snappayNotif}
        />
      )}
      <div className={`${style.purchaseButtonWrapper}`}>
        {replaceButton ? (
          replaceButton
        ) : (
          <AddToCartButton
            id={+productId}
            type={orderType}
            app={app}
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
        {children && children}
      </div>
    </div>
  );
}
