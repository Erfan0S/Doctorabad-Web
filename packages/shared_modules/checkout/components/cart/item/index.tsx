"use client";
import Image from "next/image";
import style from "./CartItem.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import RecycleBin from "../../../../assets/svg/recycleBin";
import { calcDiscountPercentage } from "../../../utils/calcDiscountPercentage";
import { cartActions } from "@repo/core/states/cart";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { DiscountPlanType, Order, OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import {
  ListProductSnappayNotif,
  Loading,
  QuantityProductButton,
} from "../../../../common/components";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { Apps } from "@repo/core/types/general";
// @ts-ignore
import examLogo from "@repo/shared_modules/images/doctor-exam.png";
// @ts-ignore
import learnLogo from "@repo/shared_modules/images/doctor-learn.png";
// @ts-ignore
import clinicPlanLogo from "@repo/shared_modules/images/heart.png";
// @ts-ignore
import marketLogo from "@repo/shared_modules/images/doctor-market.png";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { SidePanelPage } from "@repo/core/types/sidePanel";

const CartItem = ({
  id,
  price_main,
  price_off,
  product_pic,
  product_title,
  quantity,
  product_id,
  price_amazing,
  variants,
  product_type,
  installment_payment,
  discount_plan_type,
}: Order) => {
  const url = generateSingleProductUrlFromId(
    product_id,
    "",
    product_type,
    discount_plan_type,
  );

  const canIncrease = product_type === OrderType.ShopProduct;
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const isExam =
    product_type === OrderType.Exam ||
    (product_type === OrderType.DiscountPlan &&
      discount_plan_type === DiscountPlanType.EXAM);
  const isLearn =
    product_type === OrderType.Course ||
    (product_type === OrderType.DiscountPlan &&
      discount_plan_type === DiscountPlanType.LERN);
  const isClinic =
    product_type === OrderType.DiscountPlan &&
    discount_plan_type === DiscountPlanType.CLINIC;
  const isMarket = product_type === OrderType.ShopProduct;
  const description = (): string | null => {
    if (isExam) {
      return "مرکز آزمون";
    } else if (isLearn) {
      return "مرکز آموزش";
    } else if (isClinic) {
      return "کلینیک من";
    } else if (isMarket) {
      return "مرکز خرید";
    }
    return null;
  };

  const defaultImage = () => {
    if (isExam) {
      return examLogo;
    } else if (isLearn) {
      return learnLogo;
    } else if (isMarket) {
      return marketLogo;
    } else if (isClinic) {
      return clinicPlanLogo;
    }
    return placeHolderDataUrl;
  };

  const onClickHandler = (e: any) => {
    if (discount_plan_type === DiscountPlanType.LERN) {
      e.preventDefault();
      modalActions.addModal(ModalTypes.SIDE_PANEL, {
        initialPage: SidePanelPage.DISCOUNTS,
      });
    }
  };

  return (
    <div
      className={`${style.cartItem} ${installment_payment ? style.cartItemInstallmentPayment : ""}`}
    >
      {installment_payment && (
        <ListProductSnappayNotif className={style.listSnappayNotif} />
      )}
      <div
        className={`${style.cartItemImage} ${!product_pic ? style.cartItemDefaultImage : ""}`}
      >
        <a href={url} onClick={onClickHandler} target="_blank">
          <Image
            src={product_pic || defaultImage()}
            alt={product_title}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </a>
      </div>
      <div className={style.cartItemContent}>
        <div className={style.cartItemTitle}>
          <a href={url} onClick={onClickHandler} target="_blank">
            {product_title}
          </a>
          {description() && (
            <span className={style.cartItemDescription}>{description()}</span>
          )}
        </div>

        <div className={style.cartItemFooter}>
          <div className={style.cartItemPrice}>
            {(!!price_off || price_amazing) && (
              <div className="off-price-wrapper">
                <small>
                  ٪
                  {calcDiscountPercentage(
                    price_main,
                    price_amazing || price_off,
                  )}
                </small>
                <span>{priceFormatter(price_main)}</span>
              </div>
            )}
            <div>
              {price_main ? (
                <>
                  {priceFormatter(price_amazing || price_off || price_main)}
                  <small>تومن</small>
                </>
              ) : (
                "رایگان"
              )}
            </div>
          </div>
          {canIncrease ? (
            <QuantityProductButton
              cardActionsLoadingHandler={cartActionsLoadingHandler}
              isLoadibg={updateCartLoading}
              id={id}
              quantity={quantity}
              className={style.cartItemButton}
              app={Apps.BASE}
            />
          ) : (
            <div className={style.cartItemButton}>
              <button
                onClick={cartActionsLoadingHandler(() =>
                  cartActions.removeFromCart(id),
                )}
              >
                {updateCartLoading ? (
                  <Loading size={15} app={Apps.BASE} />
                ) : (
                  <RecycleBin height={20} width={20} />
                )}
              </button>
            </div>
          )}
        </div>
        {!!variants && variants.length > 0 ? (
          <div className={style.cartItemVariants}>
            {variants.map((variant) => (
              <span key={variant.product_variant_id}>
                {variant.option_title}
                {!variant.check_box ? ": " + variant.option_value : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CartItem;
