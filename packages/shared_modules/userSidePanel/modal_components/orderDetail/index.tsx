import style from "./OrderDetail.module.scss";
import OrderDetailItem from "./orderDetailItem";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { OrderType } from "@repo/core/types/cart";
import { OrderDetailItemType } from "../../../checkout/types/orders";
import { CartIcon } from "../../../assets";
import { Button } from "../../../common/components";
import { div } from "framer-motion/client";

interface Props {
  orderCode: string;
  closeModal?: () => void;
}

const OrderDetail: React.FC<Props> = ({ orderCode, closeModal }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderDetail", orderCode],
    queryFn: () => {
      return api.getCartOrderDetail(orderCode);
    },
  });

  let orderItems: OrderDetailItemType[] | undefined = [];

  if (!!data?.data.data.shop_products.length) {
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
  }

  if (!!data?.data.data.courses.length) {
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

  if (!!data?.data.data.exams) {
    const exam =
      data?.data.data.exams.map((exam) => {
        return {
          price: exam.price,
          id: exam.id,
          quantity: 1,
          title: exam.exam_title,
          pic_url: exam.exam_pic_url,
          product_type: OrderType.Exam,
        };
      }) || [];
    orderItems = [...orderItems, ...exam];
  }

  // fix order descount code

  const orderData = data?.data.data;

  const orderDetailsConfig = [
    { label: "کد سفارش:", value: orderCode },
    { label: "زمان ثبت:", value: orderData?.created_at },
    {
      label: "هزینه سفارش:",
      value: priceFormatter(orderData?.price_calculated || 0),
    },
    {
      label: "هزینه ارسال:",
      value: priceFormatter(orderData?.price_shipping || 0),
      show: !!orderData?.price_shipping,
    },
    {
      label: "پرداخت شده:",
      value: priceFormatter(orderData?.price_paid || 0),
    },
    {
      label: "روش ارسال:",
      value: orderData?.order_shipping?.shipping_method,
      show: !!orderData?.order_shipping,
    },
    {
      label: "توضیح ارسال:",
      value: orderData?.order_shipping?.shipping_method_description,
      show: !!orderData?.order_shipping,
    },
    {
      label: "آخرین وضعیت:",
      value: orderData?.order_shipping?.last_text_status,
      show: !!orderData?.order_shipping,
    },
  ];

  return (
    <>
      <div className={style.orderDetail}>
        {isLoading ? (
          <Loading size={22} />
        ) : (
          <>
            <div className={`${style.orderDetailLogo} card`}>
              <CartIcon />
            </div>
            <div className={style.orderDetailHeader}>
              {orderDetailsConfig.map(
                (item) =>
                  (item.show === undefined || item.show) && (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <span>{item.value || "_"}</span>
                    </div>
                  )
              )}
            </div>
            <div className={style.orderDetailContent}>
              {orderItems?.map((cartItem) => {
                return <OrderDetailItem key={cartItem.id} {...cartItem} />;
              })}
            </div>
            <Button
              type="button"
              onClick={() => closeModal && closeModal()}
              className={style.orderDetailButton}
            >
              حله!
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
