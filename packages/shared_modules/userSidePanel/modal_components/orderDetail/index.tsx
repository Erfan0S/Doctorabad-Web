import style from "./OrderDetail.module.scss";
import OrderDetailItem from "./orderDetailItem";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { OrderType } from "@repo/core/types/cart";
import { LastProcessingShopOrder } from "../../../checkout/types/orders";
import { ResponseType } from "@repo/core/types/general";

interface Props {
  orderCode: string;
  productType?: OrderType;
}

const OrderDetail: React.FC<Props> = ({ orderCode, productType }: Props) => {
  const getApiFounction = (productType?: OrderType) => {
    switch (productType) {
      case OrderType.Course:
        return api.getLearnOrderDetail(orderCode);
      case OrderType.Course:
        return api.getPreviousOrderDetail(orderCode);
      default:
        return api.getPreviousOrderDetail(orderCode);
    }
  };

  const { data, isLoading } = useQuery<ResponseType<LastProcessingShopOrder>>({
    queryKey: ["orderDetail", orderCode, productType],
    queryFn: () => {
      return getApiFounction(productType);
    },
  });

  const orderItems = data?.data.order_items;

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
                {orderItems?.reduce(
                  (prev, current) => prev + current.quantity,
                  0
                )}{" "}
                عدد کالا
              </small>
            </div>
            <div className={style.orderDetailContent}>
              {orderItems?.map((cartItem) => {
                return (
                  <OrderDetailItem
                    variants={[]}
                    key={cartItem.id}
                    {...cartItem}
                    discount_plan_type={null}
                    product_type={productType || OrderType.ShopProduct}
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
