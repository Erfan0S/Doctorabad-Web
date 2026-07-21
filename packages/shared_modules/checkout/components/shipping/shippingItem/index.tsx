import Image from "next/image";
import { ShippingMethod } from "@repo/core/types/cart";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import classNames from "classnames";
import Loading from "../../../../common/components/loading";
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
      className={classNames(
        "relative mb-3 flex items-center rounded-xl px-2 py-1.5 transition-all duration-200 last-of-type:mb-0",
        // SCSS→Tailwind: background — .shippingItemLoading wins over .active in the old cascade
        isLoading
          ? "bg-[var(--primary-color)]"
          : active
            ? "bg-button-bg"
            : "bg-transparent",
        // SCSS→Tailwind: outline + cursor — cleared by .active
        active
          ? "cursor-default outline-none"
          : "cursor-pointer outline outline-[3px] outline-[#cdcdcd]",
      )}
      onClick={() => (!active ? onClick(props) : undefined)}
    >
      <div className="flex h-[45px] w-[45px] flex-[0_0_45px] items-center justify-center">
        <Image
          src={pic_url || placeHolderDataUrl}
          alt={title}
          width={45}
          height={45}
          className="h-auto max-h-[30px] max-w-[30px]"
        />
      </div>
      <div
        className={`max-w-[calc(100%-45px)] flex-[0_0_calc(100%-45px)] ps-2 leading-[15px] ${
          active ? "text-white" : ""
        }`}
      >
        <span className="font-semibold">{title}</span>
        <p className="mb-0 text-[11px]">{description}</p>
      </div>
      {isLoading && <Loading className="absolute left-1/2 -translate-x-1/2" />}
    </div>
  );
};

export default ShippingItem;
