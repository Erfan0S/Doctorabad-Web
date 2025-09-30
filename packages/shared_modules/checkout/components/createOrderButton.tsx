import { Button, Loading } from "../../common/components";
import { useMutation } from "@tanstack/react-query";
import { cartActions, useCart } from "@repo/core/states/cart";
import {
  CartPayInfo,
  CreateOrderRequest,
  PaymentProviders,
} from "../types/cart";
import { api } from "../../api/Api";
import { useRouter } from "next/navigation";
import { routePath } from "@repo/core/constants/routePath";
import { toast } from "react-toastify";
import {
  CreateOrderResponse,
  ShippingAddress,
  ShippingMethod,
} from "@repo/core/types/cart";
import { ResponseType } from "@repo/core/http-request/types/Request";

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
  const { count, price_paid } = useCart();
  const { replace } = useRouter();

  let orderApi: (
    data: CreateOrderRequest
  ) => Promise<ResponseType<CreateOrderResponse>> = api.createOrder;

  switch (paymentMethod) {
    case PaymentProviders.SNAPP_PAY:
      orderApi = async (data: CreateOrderRequest) => {
        return api.createProviderOrder({
          ...data,
          provider: PaymentProviders.SNAPP_PAY,
        });
      };
      break;
  }

  const createOrder = useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi(data),
    retry: 0,
    onSuccess: (data) => {
      if (data.data.data.identifier) {
        cartActions.getCartData();
        replace(
          `${routePath.callback}?identifier=${data.data.data.identifier}`
        );
      }

      const { message, url } = data.data.data!;

      toast(message, { type: "success", position: "top-left" });
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
    <Button onClick={onCreateOrder}>
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
