import Image from "next/image";
import style from "./ShippingItem.module.scss";
import { ShippingMethod } from "@repo/core/types";
import { placeHolderDataUrl } from "@repo/core/constants";
import classNames from "classnames";
import Loading from "../../loading";
import React from "react";

interface Props extends ShippingMethod {
  active: boolean;
  onClick: (method: ShippingMethod) => void;
  isLoading?: boolean;
}
const ShippingItem: React.FC<Props> = (props) => {
  const {
    id,
    title,
    pic_url,
    description,
    active,
    onClick,
    isLoading = false,
  } = props;
  return (
    <div
      className={classNames(style.shippingItem, {
        [style.active!]: active,
        [style.shippingItemLoading!]: isLoading,
      })}
      onClick={() => (!active ? onClick(props) : undefined)}
    >
      <div className={style.shippingItemImage}>
        <Image
          src={pic_url || placeHolderDataUrl}
          alt={title}
          width={45}
          height={45}
        />
      </div>
      <div className={style.shippingItemContent}>
        <span>{title}</span>
        <p>{description}</p>
      </div>
      {isLoading && <Loading className={style.loading} />}
    </div>
  );
};

export default ShippingItem;
