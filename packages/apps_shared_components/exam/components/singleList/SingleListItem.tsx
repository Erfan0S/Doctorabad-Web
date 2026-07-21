"use client";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import React, { useState } from "react";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import {
  AddToCartButton,
  Button,
  FavoriteButton,
  ProductPrice,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
// @ts-ignore
import examIcon from "@repo/shared_modules/images/doctor-exam.png";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { ExamType } from "@repo/apps_shared_components/exam/types";
import { useRouter } from "next/navigation";
import { baseUrls, examPaths } from "@repo/core/constants/routePath";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import { api } from "@repo/shared_modules/api";

const singleItemCls =
  "relative flex flex-col gap-[10px] border-[1.5px] border-solid border-gray-light bg-white p-[10px] shadow-none [&>div]:flex [&>div]:flex-row [&>div]:justify-between [&>div]:items-end [&>div]:gap-[10px] [&>div:first-child]:justify-start [&>div:first-child]:items-center [&_button]:flex-none [&_button]:h-[35px] [&_button]:min-w-[100px] [&_button]:text-[0.7rem] max-md:[&_button]:text-[10px] [&_img]:aspect-square [&_img]:h-[100px] [&_img]:w-auto [&_img]:rounded-[15px]";
const favoriteButtonCls =
  "[&_button]:!h-[35px] [&_button]:!w-[35px] [&_button]:!min-w-[35px] [&_button]:!max-w-[35px] [&_button]:!p-0 [&_button]:shrink-0 [&_button]:aspect-square";
const noImageCls = "border border-solid border-gray-light bg-white p-3";
const singleItemPriceCls = "[&>div]:!justify-start";
const singleItemPriceWrapperCls = "flex flex-col text-[14px]";
const singleItemDescriptionCls =
  "flex flex-col gap-[3px] [&_span]:font-normal [&_span]:text-gray [&_h3]:pe-[50px] [&_h3]:text-[15px] [&_h3]:font-bold";
const singleItemButtonsCls = "flex items-center gap-[7px]";
const singleItemAccessButtonsCls =
  "flex flex-row-reverse gap-[10px] [&_button]:flex-none [&_button]:!min-w-[80px] [&_a]:text-white";

type Props = {
  item: ExamType;
  haveGeneralAccess?: boolean;
  haveFavoriteButton?: boolean;
  isSidePanel?: boolean;
};

function SingleListItem({
  item,
  haveGeneralAccess,
  haveFavoriteButton,
  isSidePanel,
}: Props) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(
    isUserLoggedIn() && (item.user_has_access || haveGeneralAccess),
  );

  React.useEffect(() => {
    setHasAccess(
      isUserLoggedIn() && (item.user_has_access || haveGeneralAccess),
    );
  }, [item.user_has_access, haveGeneralAccess]);

  const isShowInstallmentText =
    item.installment_payment &&
    item.installment_text &&
    !hasAccess &&
    item.main_price > 4000;

  const isMobile = useMediaQuery("(max-width: 500px)");

  const recommendationHandler = async () => {
    modalActions.addModal(ModalTypes.BUY_RECOMMENDATION, { exam: item });
  };

  return (
    <div className={`${singleItemCls} card`}>
      <div>
        <Image
          src={item.picture || examIcon}
          alt={item.title}
          placeholder={placeHolderDataUrl}
          width={100}
          height={100}
          className={!item.picture ? noImageCls : ""}
        />
        <div className={singleItemDescriptionCls}>
          <h3>{item.title}</h3>
          <span>{item.date === "بدون زمان" ? "" : item.date}</span>
          <span>{item.place === "بدون مکان" ? "" : item.place}</span>
        </div>
      </div>
      <div>
        <div className={singleItemPriceWrapperCls}>
          <ProductPrice
            mainPrice={item.main_price}
            offPrice={item.off_price}
            app={Apps.EXAM}
            size={15}
            className={singleItemPriceCls}
          />
          {item.installment_text && isShowInstallmentText && (
            <ProductSnappayNotif
              text={item.installment_text}
              className={isSidePanel ? "text-[10px]" : "max-md:text-[10px]"}
            />
          )}
        </div>
        <div className={singleItemButtonsCls}>
          {haveFavoriteButton && (
            <FavoriteButton
              initialState={!!item.favorite}
              action={() => {
                return api.examSingleExamFavorite(item.id, !item.favorite);
              }}
              app={Apps.EXAM}
              className={favoriteButtonCls}
            />
          )}
          {hasAccess ? (
            <div className={singleItemAccessButtonsCls}>
              <Button
                onClick={() => {
                  router.push(`${baseUrls.exam}${examPaths.single}/${item.id}`);
                  setTimeout(() => {
                    modalActions.clearModals();
                  }, 100);
                }}
              >
                ورود
              </Button>
              <Button
                app={Apps.EXAM}
                onClick={() => {
                  modalActions.addModal(ModalTypes.EXAM_START, { exam: item });
                }}
              >
                شروع آزمون
              </Button>
            </div>
          ) : (
            <AddToCartButton
              app={Apps.EXAM}
              id={item.id}
              type={OrderType.Exam}
              isColumn={isSidePanel || isMobile}
              onClick={recommendationHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleListItem;
