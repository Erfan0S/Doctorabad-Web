import { Button, Loading } from "../../common/components";
import { useMutation } from "@tanstack/react-query";
import { cartActions, useCart } from "@repo/core/states/cart";
import {
  CartPayInfo,
  CreateOrderRequest,
  PaymentProviders,
} from "../types/cart";
import { api } from "../../api/Api";
import { useSearchParams } from "next/navigation";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { toast } from "react-toastify";
import {
  CreateOrderResponse,
  ShippingAddress,
  ShippingMethod,
  OrderType,
} from "@repo/core/types/cart";
import { ResponseType } from "@repo/core/http-request/types/Request";
import style from "./chekcout.module.scss";
import { Apps } from "@repo/core/types/general";
import { REDIRECTED_APP_KEY } from "@repo/core/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  payInfo: CartPayInfo;
  shippingMethod: ShippingMethod | undefined;
  currentAddress: ShippingAddress | undefined;
  hasPhysicalProduct: boolean;
};

function CreateOrderButton({
  payInfo: { description, payWithCredit, discountInfo, paymentMethod },
  currentAddress,
  hasPhysicalProduct,
  shippingMethod,
}: Props) {
  const { count, data: cartItems } = useCart();
  const redirectedApp = useSearchParams()?.get(REDIRECTED_APP_KEY) as
    | Apps
    | undefined;
  const queryClient = useQueryClient();
  let orderApi: (
    data: CreateOrderRequest
  ) => Promise<ResponseType<CreateOrderResponse>> = async (
    data: CreateOrderRequest
  ) => api.createOrder(data);

  switch (paymentMethod) {
    case PaymentProviders.SNAPP_PAY:
      orderApi = async (data: CreateOrderRequest) =>
        api.createProviderOrder({
          ...data,
          provider: PaymentProviders.SNAPP_PAY,
        });
      break;
    default:
      break;
  }

  const createOrder = useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi(data),
    retry: 0,
    onSuccess: (data) => {
      if (data.data.data.identifier) {
        cartActions.getCartData();
        window.open(
          `${baseUrls.base}${routePath.callback}?identifier=${data.data.data.identifier}${redirectedApp ? "&app=" + redirectedApp : ""}`,
          "_self"
        );
      }

      const { message, url } = data.data.data!;

      toast(message, { type: "success", position: "top-left" });

      queryClient.invalidateQueries({ queryKey: ["user-plans-clinic"] });

      window.open(url, "_self");
    },
    onError: (error: any) => {
      if (error?.status === 422) {
        cartActions.getCartData();
      }
    },
  });

  const onCreateOrder = () => {
    if (!count)
      return toast("سبدخرید خالی است", { type: "error", position: "top-left" });
    if (!shippingMethod && hasPhysicalProduct)
      return toast("ابتدا نوع تحویل محصول را انتخاب کنید", {
        type: "error",
        position: "top-left",
      });

    const request: CreateOrderRequest = {
      use_credit: payWithCredit,
      discount_code_id: discountInfo?.discount_code_id || null,
      description: description,
    };
    if (hasPhysicalProduct) {
      request.shipping_method_id = shippingMethod!.id;
      request.address_id = currentAddress!.id;
    }
    createOrder.mutate(request);
  };

  return (
    <Button onClick={onCreateOrder} className={style.createOrderButton}>
      {" "}
      {createOrder.isPending ? (
        <Loading size={25} />
      ) : (
        "پرداخت و نهایی کردن سفارش"
      )}
    </Button>
  );
}

export default CreateOrderButton;
