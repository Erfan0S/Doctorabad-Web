import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import React from "react";
import style from "./sinlgesList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { AddToCartButton, Button } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import Link from "next/link";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import examIcon from "@repo/shared_modules/images/doctor-exam.png";
import { ExamType } from "@repo/apps_shared_components/exam/types/exam.ts";

type Props = {
  item: ExamType;
  haveGeneralAccess?: boolean;
};

function SingleListItem({ item, haveGeneralAccess }: Props) {
  const hasAccess = item.user_has_access || haveGeneralAccess;
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
      </div>
      <div>
        <span className={style.singleItemPrice}>
          {priceFormatter(item.main_price)} تومن
        </span>
        {false ? (
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
