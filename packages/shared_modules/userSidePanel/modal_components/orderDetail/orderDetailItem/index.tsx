"use client";
import Image from "next/image";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Order, OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId, generateInsuranceSlug } from "@repo/core/utils/UrlUtils";
import { modalActions } from "@repo/core/modal/modals";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { OrderDetailItemType } from "../../../../checkout/types/orders";
import { CoinIcon } from "../../../../assets";
import PaperIcon from "../../../../assets/svg/paper";

const OrderDetailItem = ({
  id,
  pic_url,
  price,
  product_type,
  quantity,
  title,
  price_main,
  draft,
}: OrderDetailItemType) => {
  const { replace } = useRouter();

  const getSlug = () => {
    if (product_type === OrderType.Insurance) {
      return generateInsuranceSlug({
        product_id: id,
        product_title: title,
        product_pic: pic_url || "",
        price_off: price,
        price_main: price_main || price,
        draft: draft,
      });
    }
    return "";
  };

  const url = generateSingleProductUrlFromId(id, getSlug(), product_type);
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalActions.clearModals();
    window.open(url);
  }; 
  return (
    <div>
      <a href={url} target="_blank" onClick={navigate} className="flex items-stretch border border-solid border-[#d1d1d1] rounded-[15px] py-[8px] px-[10px]">
        <div className="flex-[0_0_75px] w-[75px] h-[75px] rounded-[8px]">
          <Image
            src={pic_url || placeHolderDataUrl}
            alt={title}
            width={75}
            height={75}
            className="rounded-[8px] w-full h-full object-contain"
          />
        </div>
        <div className="flex-[0_0_calc(100%-75px)] py-[8px] pe-0 ps-[12px] flex flex-col justify-between">
          <div className="text-black leading-[17px] font-semibold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{title}</div>
          <div className="flex mt-auto items-center justify-start gap-[40px]">
            <span className="flex items-center text-[#949494] gap-[3px] text-[12px] [&_svg]:w-[15px] [&_svg]:h-auto">
              <CoinIcon />
              {priceFormatter(price)}
              <small>تومن</small>
            </span>
            <span className="flex items-center text-[#949494] gap-[3px] text-[12px] [&_svg]:w-[15px] [&_svg]:h-auto">
              <PaperIcon />
              {quantity} <small>عدد</small>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default OrderDetailItem;
