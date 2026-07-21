"use client";
import Image from "next/image";
import RecycleBin from "../../../../assets/svg/recycleBin";
import { cartActions } from "@repo/core/states/cart";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { DiscountPlanType, Order, OrderType } from "@repo/core/types/cart";
import {
  generateSingleProductUrlFromId,
  generateInsuranceSlug,
} from "@repo/core/utils/UrlUtils";
import {
  ListProductSnappayNotif,
  Loading,
  ProductPrice,
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
// @ts-ignore
import downloadLogo from "@repo/shared_modules/images/doctor-download.png";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { SidePanelPage } from "@repo/core/types/sidePanel";

// SCSS→Tailwind: image ratio variants (was style[imageType()] module lookup)
const imageTypeClasses = {
  square: "aspect-square h-[60px] w-[60px]",
  landscape: "aspect-video h-[60px] w-auto",
  portrait: "aspect-[3/4] h-auto w-[60px]",
  auto: "w-auto",
} as const;

// Shared by QuantityProductButton and the remove-button wrapper (same class in scss)
const cartItemButtonClasses =
  "ms-auto flex h-[25px] w-auto flex-none flex-row-reverse items-center rounded-lg bg-button-bg px-1 text-[14px] text-white [&_span]:w-[25px] [&_span]:text-center [&_button]:m-0 [&_button]:flex [&_button]:w-[25px] [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:border-0 [&_button]:bg-transparent [&_button]:p-0 [&_button]:leading-[25px] [&_button]:text-white [&_button]:outline-none [&_button:hover]:outline-none [&_button:active]:outline-none [&_button:focus]:outline-none";

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
  draft,
}: Order) => {
  const getInsuranceSlug = () => {
    return generateInsuranceSlug({
      product_id,
      product_title,
      product_pic,
      price_off,
      price_main,
      draft,
    });
  };

  const url = generateSingleProductUrlFromId(
    product_id,
    OrderType.Insurance ? getInsuranceSlug() : "",
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
  const isDownload = product_type === OrderType.Package;
  const isInsurance = product_type === OrderType.Insurance;

  // TODO: refactor multiple app handling

  const description = (): string | null => {
    if (isExam) {
      return "مرکز آزمون";
    } else if (isLearn) {
      return "مرکز آموزش";
    } else if (isClinic) {
      return "کلینیک من";
    } else if (isMarket) {
      return "مرکز خرید";
    } else if (isDownload) {
      return "مرکز محتوا";
    } else if (isInsurance) {
      return "بیمه‌من";
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
    } else if (isDownload) {
      return downloadLogo;
    }
    return placeHolderDataUrl;
  };

  const imageType = () => {
    if (isExam || isMarket || isClinic || isInsurance) {
      return "square";
    } else if (isLearn) {
      return "landscape";
    } else if (isDownload) {
      return "portrait";
    }
    return "auto";
  };

  const onClickHandler = (e: any) => {
    if (discount_plan_type === DiscountPlanType.LERN) {
      e.preventDefault();
      modalActions.addModal(ModalTypes.SIDE_PANEL, {
        initialPage: SidePanelPage.DISCOUNTS,
      });
    }
  };

  // TODO: continue from here

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-[15px] border-0 border-b border-solid border-gray px-0 py-2">
      {installment_payment && (
        <ListProductSnappayNotif className="left-0 top-[5px] text-[10px]" />
      )}
      <div
        className={`flex items-center justify-center overflow-hidden rounded-lg shadow-[0_0_6px_0px_rgba(0,0,0,0.15)] ${
          !product_pic
            ? "h-[60px] w-[60px] p-3 [&_img]:!h-10 [&_img]:!w-10"
            : "h-auto w-auto"
        }`}
      >
        <a href={url} onClick={onClickHandler} target="_blank">
          <Image
            src={product_pic || defaultImage()}
            alt={product_title}
            width={0}
            height={0}
            sizes="100vw"
            className={`max-h-full min-w-[60px] max-w-[110px] object-contain ${
              !!product_pic
                ? imageTypeClasses[imageType()]
                : imageTypeClasses.square
            }`}
          />
        </a>
      </div>
      <div className="flex min-h-[70px] flex-1 flex-col justify-between">
        <div className="mb-2 flex flex-col items-start gap-[3px]">
          <a
            href={url}
            onClick={onClickHandler}
            target="_blank"
            className={`line-clamp-2 overflow-hidden text-ellipsis text-right font-semibold leading-[17px] text-black ${
              installment_payment ? "pe-16" : "pe-[25px]"
            }`}
          >
            {product_title}
          </a>
          {description() && (
            <span className="text-[11px] leading-[18px] text-[#88898d]">
              {description()}
            </span>
          )}
        </div>

        <div className="flex items-end">
          {/* TODO: use general ProductPrice component */}
          <ProductPrice
            mainPrice={price_main}
            offPrice={price_off}
            amazingPrice={price_amazing}
            app={Apps.BASE}
            size={14}
            colorVariant="simple"
            className="max-w-28"
          />
          {canIncrease ? (
            <QuantityProductButton
              orderId={id}
              orderType={product_type}
              quantity={quantity}
              className={cartItemButtonClasses}
              app={Apps.BASE}
            />
          ) : (
            <div className={cartItemButtonClasses}>
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
          <div className="flex flex-row flex-wrap">
            {variants.map((variant) => (
              <span
                key={variant.product_variant_id}
                className="me-[5px] mt-[5px] rounded-[50px] bg-[#f8f8f8] px-[10px] py-0 text-[10px] leading-[18px] text-[#88898d]"
              >
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
