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
  type?: OrderType;
  closeModal?: () => void;
}

const OrderDetail: React.FC<Props> = ({
  orderCode,
  closeModal,
  type,
}: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderDetail", orderCode],
    queryFn: () => {
      return api.getCartOrderDetail(orderCode);
    },
  });

  let orderItems: OrderDetailItemType[] | undefined = [];

  if (
    !!data?.data.data.shop_products?.length && ( !!type ? type === OrderType.ShopProduct : true )
  ) {
    const shop =
      data?.data.data.shop_products?.map((product) => {
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

  if (
    !!data?.data.data.courses?.length && ( !!type ? type === OrderType.Course : true )
  ) {
    const course =
      data?.data.data.courses?.map((product) => {
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

  if (!!data?.data.data.exams?.length && ( !!type ? type === OrderType.Exam : true )) {
    const exam =
      data?.data.data.exams?.map((exam) => {
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
  if (!!data?.data.data.package?.length && ( !!type ? type === OrderType.Package : true )) {
    const package_item =
      data?.data.data.package?.map((package_item) => {
        return {
          price: package_item.price,
          id: package_item.id,
          quantity: 1,
          title: package_item.package_title,
          pic_url: package_item.package_pic_url,
          product_type: OrderType.Package,
        };
      }) || [];
    orderItems = [...orderItems, ...package_item];
  }
  if (!!data?.data.data.insurance?.length && ( !!type ? type === OrderType.Insurance : true )) {
    const insurance =
      data?.data.data.insurance?.map((insurance) => {
        const normalizedDraft = {
          // keep existing draft fields but normalize key names expected by UrlUtils
          ...(insurance.draft || {}),
          last_insurance_id:
            (insurance.draft && (insurance.draft.last_insurance_id ?? insurance.draft.last_insurance)) ?? null,
          current_insurance_end_date:
            (insurance.draft && (insurance.draft.current_insurance_end_date ?? insurance.draft.end_date)) ?? null,
          insured_name: (insurance.draft && (insurance.draft.insured_name ?? insurance.draft.title)) ?? undefined,
          insured_phone: (insurance.draft && (insurance.draft.insured_phone ?? insurance.draft.phone)) ?? undefined,
        };

        return {
          price: insurance.price,
          id: insurance.insurance_id,
          quantity: 1,
          title: insurance.insurance_title,
          pic_url: insurance.insurance_pic,
          product_type: OrderType.Insurance,
          price_main: insurance.price, // Or insurance.price_main if available
          draft: normalizedDraft,
        };
      }) || [];
    orderItems = [...orderItems, ...insurance];
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
      <div className="w-[400px] max-w-full mx-auto my-0 p-[20px] pt-[48px] pb-[28px] bg-white rounded-[24px] flex flex-col relative max-sm:w-[320px]">
        {isLoading ? (
          <Loading size={22} />
        ) : (
          <>
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 bg-white [&_svg]:w-[45px] [&_svg]:h-auto card">
              <CartIcon />
            </div>
            <div className="flex flex-col items-start gap-[8px] mb-[20px] border-2 border-solid border-[#4fcc4c] rounded-[10px] py-[8px] px-[12px]">
              {orderDetailsConfig.map(
                (item) =>
                  (item.show === undefined || item.show) && (
                    <div key={item.label} className="flex flex-row items-start justify-start flex-wrap gap-[4px]">
                      <span className="text-[12px] font-medium text-[#949494]">{item.label}</span>
                      <span className="text-[12px] font-medium text-black">{item.value || "_"}</span>
                    </div>
                  )
              )}
            </div>
            <div className="flex flex-col gap-[10px] max-h-[35vh] overflow-y-auto">
              {orderItems?.map((cartItem) => {
                return <OrderDetailItem key={cartItem.id} {...cartItem} />;
              })}
            </div>
            <Button
              type="button"
              onClick={() => closeModal && closeModal()}
              className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 min-w-[150px]"
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
