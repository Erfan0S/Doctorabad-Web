"use client";
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
// @ts-ignore
import examIcon from "@repo/shared_modules/images/doctor-exam.png";
import { ExamOrderItem } from "../../types/orders";
import OrderMetaData from "../common/OrderMetaData";
import { useRouter } from "next/navigation";
import { ExamRoutePath } from "@repo/apps_shared_components/exam/constants/examRoutPaths.ts";

type Props = {
  item: ExamOrderItem;
};

function ExamOrderItem({ item }: Props) {
  const router = useRouter();

  return (
    <div className={`${style.singleItem} card`}>
      <div>
        <Image
          src={item.pic_url || examIcon}
          alt={item.title}
          placeholder={placeHolderDataUrl}
          width={100}
          height={100}
          className={!item.pic_url ? style.noImage : ""}
        />
      </div>
      <div>
        <h3>{item.title}</h3>
        <div className={style.singleItemDescription}>
          <OrderMetaData order={item} />
        </div>
        <div className={style.singleItemAccessButtons}>
          <Button
            onClick={() => {
              setTimeout(
                () => router.push(`${ExamRoutePath.single}/${item.id}`),
                100
              );
              modalActions.clearModals();
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
      </div>
    </div>
  );
}

export default ExamOrderItem;
