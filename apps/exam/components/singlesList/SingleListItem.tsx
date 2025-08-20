import { ExamType } from "@/types/exam";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import React from "react";
import Button from "../common/Button/Button";
import style from "./sinlgesList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

type Props = {
  item: ExamType;
};

function SingleListItem({ item }: Props) {
  return (
    <div className={`${style.singleItem} card`}>
      <div>
        <Image
          src={item.picture || ""}
          alt={item.title}
          placeholder={placeHolderDataUrl}
          width={100}
          height={100}
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
        <Button>افزودن به سبد خرید</Button>
      </div>
    </div>
  );
}

export default SingleListItem;
