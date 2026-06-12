"use client";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import React, { useState } from "react";
import style from "./sinlgesList.module.scss";
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

  console.log(item);

  return (
    <div
      className={`${style.singleItem} card ${isSidePanel ? style.singleItemSidePanel : ""}`}
    >
      <div>
        <Image
          src={item.picture || examIcon}
          alt={item.title}
          placeholder={placeHolderDataUrl}
          width={100}
          height={100}
          className={!item.picture ? style.noImage : ""}
        />
        <div className={style.singleItemDescription}>
          <h3>{item.title}</h3>
          <span>{item.date}</span>
          <span>{item.place}</span>
        </div>
      </div>
      <div>
        <div className={style.singleItemPriceWrapper}>
          <ProductPrice
            mainPrice={item.main_price}
            offPrice={item.off_price}
            app={Apps.EXAM}
            size={14}
            className={style.singleItemPrice}
          />
          {item.installment_text && isShowInstallmentText && (
            <ProductSnappayNotif
              text={item.installment_text}
              className={style.installmentPayment}
            />
          )}
        </div>
        <div className={style.singleItemButtons}>
          {haveFavoriteButton && (
            <FavoriteButton
              initialState={!!item.favorite}
              action={() => {
                return api.examSingleExamFavorite(item.id, !item.favorite);
              }}
              app={Apps.EXAM}
              className={style.favoriteButton}
            />
          )}
          {hasAccess ? (
            <div className={style.singleItemAccessButtons}>
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
