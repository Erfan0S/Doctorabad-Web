import style from "./OrderDetail.module.scss";
import OrderDetailItem from "./orderDetailItem";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { OrderType } from "@repo/core/types/cart";
import { OrderDetailItemType } from "../../../checkout/types/orders";

interface Props {
  orderCode: string;
  productType?: OrderType;
}

const OrderDetail: React.FC<Props> = ({ orderCode, productType }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderDetail", orderCode, productType],
    queryFn: () => {
      return api.getCartOrderDetail(orderCode);
    },
  });

  let orderItems: OrderDetailItemType[] | undefined = [];

  const shop =
    data?.data.data.shop_products.map((product) => {
      return {
        price: product.price,
        id: product.id,
        quantity: product.quantity,
        title: product.product_title,
        pic_url: product.product_pic_url,
        product_type: OrderType.ShopProduct,
      };
    }) || [];

  orderItems = [...orderItems, ...shop];

  if (productType !== OrderType.ShopProduct) {
    const course =
      data?.data.data.courses.map((product) => {
        return {
          price: product.price,
          id: product.id,
          quantity: 1,
          title: product.course_title,
          pic_url: product.course_pic_url,
          product_type: OrderType.Course,
        };
      }) || [];
    orderItems = [...orderItems, ...course];
  }

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
                return <OrderDetailItem key={cartItem.id} {...cartItem} />;
              })}
            </div>
            {!!data!.data.data.price_shipping && (
              <div className={style.orderDetailTotalPrice}>
                <span> حمل‌ونقل:</span>
                {priceFormatter(data!.data.data.price_shipping)} تومن
              </div>
            )}
            <div className={style.orderDetailTotalPrice}>
              <span>مجموع:</span>
              {priceFormatter(data?.data.data.price_paid || 0)} تومن
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
