import { priceFormatter } from "@repo/core/utils/priceFormatter";
import CartCheckIcon from "../../../../assets/svg/cartCheck";
import CardCheck from "../../../../assets/svg/cardCheck";
import CalenderCheck from "../../../../assets/svg/calenderCheck";
import { OrderMetaData } from "../../../types/orders";
import { formatTimeJ } from "@repo/core/utils/formatTime";

const OrderMetaData = ({ order }: { order: OrderMetaData }) => {
  return (
    <div className="flex w-full items-center gap-5 text-[0.72rem] text-[#666] max-[768px]:text-[0.75rem] max-[425px]:gap-4 max-[425px]:text-[0.6rem]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CartCheckIcon fontSize={16} />
          <span>{order.order_code}</span>
        </div>
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CalenderCheck fontSize={16} />
          <span>{formatTimeJ(order.created_at)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CardCheck fontSize={16} />
          <div>
            <span
              style={{
                textDecoration: order.price_off ? "line-through" : "",
              }}
            >
              {priceFormatter(order.price_main)} تومن
            </span>
            {order.price_off ? (
              <span>{priceFormatter(order.price_off)} تومن</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMetaData;
