import style from "./OrderDetail.module.scss";
import OrderDetailItem from "./orderDetailItem";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";

interface Props {
  orderCode: string;
}

const OrderDetail: React.FC<Props> = ({ orderCode }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderDetail", orderCode],
    queryFn: () => {
      return api.getPreviousOrderDetail(orderCode);
    },
  });

  // fix order descount code

  return (
    <>
      <div className={style.orderDetail}>
        {isLoading ? (
          <Loading size={22} />
        ) : (
          <>
            <div className={style.orderDetailTitle}>
              <span>سفارش {orderCode}</span>
              <small>
                {data?.data.order_items.reduce(
                  (prev, current) => prev + current.quantity,
                  0
                )}{" "}
                عدد کالا
              </small>
            </div>
            <div className={style.orderDetailContent}>
              {data?.data.order_items.map((cartItem) => {
                return (
                  <OrderDetailItem
                    variants={[]}
                    key={cartItem.id}
                    {...cartItem}
                    discount_plan_type={null}
                  />
                );
              })}
            </div>
            {!!data!.data.order_shipping?.price && (
              <div className={style.orderDetailTotalPrice}>
                <span> حمل‌ونقل:</span>
                {priceFormatter(data!.data.order_shipping?.price)} تومن
              </div>
            )}
            <div className={style.orderDetailTotalPrice}>
              <span>مجموع:</span>
              {priceFormatter(
                (data?.data.order_shipping?.price || 0) +
                  data!.data.data.price_calculated
              )}{" "}
              تومن
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
