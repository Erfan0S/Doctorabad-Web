import { DiscountPlan } from "@repo/core/types/user";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { OrderType } from "@repo/core/types/cart";
import { AddToCartButton } from "../../common/components";

type Props = {
  data: DiscountPlan;
};

export const DiscountItem = ({ data }: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[10px] border-[3px] border-solid border-green p-[15px] pb-[40px] shadow-[0_0_9px_0px_#b5b5b5]">
      <h3 className="flex w-full flex-1 items-center justify-center text-center text-[length:x-large]">{data?.title}</h3>
      <p className="flex w-full flex-1 items-center justify-center text-center text-[length:small] font-medium">{data?.description}</p>
      <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <span className="text-[length:x-large] font-bold">{priceFormatter(data?.off_price || 0)} تومن</span>
        <span className="mt-[5px] text-[19px] font-bold text-[#818181] line-through">{priceFormatter(data?.main_price || 0)} تومن</span>
      </div>
      <div className="absolute -bottom-[22.5px] flex w-full justify-center gap-[5px]">
        <AddToCartButton
          id={data.id}
          type={OrderType.DiscountPlan}
          isColumn
          className="[&_button]:h-[45px] [&_button]:w-[225px]"
        />
      </div>
    </div>
  );
};
