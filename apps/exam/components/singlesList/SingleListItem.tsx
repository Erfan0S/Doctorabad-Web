import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import React, { useState } from "react";
import style from "./sinlgesList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import {
  AddToCartButton,
  Button,
  FavoriteButton,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import Link from "next/link";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import examIcon from "@repo/shared_modules/images/doctor-exam.png";
import { ExamType } from "@/types/exam";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

type Props = {
  item: ExamType;
  haveGeneralAccess?: boolean;
};

function SingleListItem({ item, haveGeneralAccess }: Props) {
  const [hasAccess, setHasAccess] = useState(
    isUserLoggedIn() && (item.user_has_access || haveGeneralAccess)
  );

  React.useEffect(() => {
    setHasAccess(
      isUserLoggedIn() && (item.user_has_access || haveGeneralAccess)
    );
  }, [item.user_has_access, haveGeneralAccess]);

  const isShowInstallmentText =
    item.installment_payment &&
    item.installment_text &&
    !hasAccess &&
    item.main_price > 4000;

  return (
    <div className={`${style.singleItem} card`}>
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
        <FavoriteButton
          id={item.id}
          initialFavoriteState={item.favorite}
          app={Apps.EXAM}
          className={style.favoriteButton}
        />
      </div>
      <div>
        <div className={style.singleItemPriceWrapper}>
          <span className={style.singleItemPrice}>
            {item.main_price
              ? `${priceFormatter(item.main_price)} تومن`
              : "رایگان"}
            {item.installment_text && isShowInstallmentText && (
              <ProductSnappayNotif
                text={item.installment_text}
                className={style.installmentPayment}
              />
            )}
          </span>
        </div>
        {hasAccess ? (
          <div className={style.singleItemAccessButtons}>
            <Button>
              <Link href={`/single/${item.id}`}>ورود</Link>
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
          <AddToCartButton app={Apps.EXAM} id={item.id} type={OrderType.Exam} />
        )}
      </div>
    </div>
  );
}

export default SingleListItem;
