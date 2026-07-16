import { DiscountPlanType } from "@/types/discountPlan";
import React from "react";
import {
  AddToCartButton,
  ProductPrice,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { cartActions } from "@repo/core/states/cart";
import VipIcon from "@/assets/svg/vipIcon";

type Props = {
  item: DiscountPlanType;
};

function DiscountPlanItem({ item }: Props) {
  cartActions.getCartData();
  return (
    <div className="card w-full overflow-hidden relative [&>div]:min-h-[65px]">
      {/* ponytail: physical left kept for vip icon (matches original scss) */}
      <div className="bg-purple px-5 py-[10px] relative [&_svg]:absolute [&_svg]:left-5 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 [&_svg]:text-white">
        <h3 className="text-white">{item.title}</h3>
        <p className="[font-size:small] max-md:[font-size:smaller] text-white font-light">
          {item.description}
        </p>
        {item.vip && <VipIcon />}
      </div>
      <div className="px-5 py-[10px] flex justify-between items-center gap-1 [&_button]:flex-none [&_button]:w-[120px] [&_button]:[font-size:small] [&_button]:py-0 [&_button]:px-[5px] [&_button]:h-[35px] max-[450px]:[&_button]:text-[12px] max-[450px]:[&_button]:w-[110px] max-[450px]:[&_button]:h-8">
        <div className="flex flex-col gap-[5px] [&>span]:text-purple [&>span]:text-[15px] [&>span:first-of-type]:line-through [&>span:first-of-type]:text-[12px] [&>span:last-of-type]:no-underline [&>span:last-of-type]:text-[15px]">
          <ProductPrice
            mainPrice={item.main_price}
            offPrice={item.off_price}
            app={Apps.EXAM}
            size={16}
          />
          {/* {!!item.off_price && (
            <span>{priceFormatter(item.main_price)} تومن</span>
          )}
          <span>
            {(!item.main_price && !item.off_price) || item.free
              ? "رایگان"
              : `${priceFormatter(item.off_price || item.main_price)} تومن`}
          </span> */}
          {item.installment_payment && item.installment_text && (
            <ProductSnappayNotif
              text={item.off_price || item.main_price}
              className="!left-[5px] !top-[5px] !mb-0 max-[450px]:p-[5px] max-[450px]:text-[10px]"
            />
          )}
        </div>
        <AddToCartButton
          id={item.id}
          type={OrderType.DiscountPlan}
          app={Apps.EXAM}
        />
      </div>
    </div>
  );
}

export default DiscountPlanItem;
