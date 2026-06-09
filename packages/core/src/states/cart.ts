import { create } from "zustand";
import { CartResponse, CartState, Order, OrderType } from "../types/cart";
import { api } from "@repo/shared_modules/api";

import { ResponseType } from "../types/general";
import { toast } from "react-toastify";
import { ProductVariantsValue } from "../types/productVariants";
import { isUserLoggedIn } from "../utils/authUtils";
import { isServerSide } from "../constants/constants";

const initialState = {
  data: [] as Order[],
  initLoading: !!isUserLoggedIn(),
} as CartState;

export const storeCart = create<CartState>(() => initialState);

const updateCart = (response: ResponseType<CartResponse>) =>
  storeCart.setState({ ...response.data, initLoading: false });

let pendingGetCartList: Promise<ResponseType<CartResponse>> | null = null;

export const cartActions = {
  async getCartData() {
    if (!isUserLoggedIn()) return;

    if (!pendingGetCartList) {
      pendingGetCartList = api.getCartList().finally(() => {
        pendingGetCartList = null;
      }) as Promise<ResponseType<CartResponse>>;
    }

    const response = await pendingGetCartList;
    updateCart(response);
  },
  async addToCart(
    cartItem: number,
    type: OrderType = OrderType.ShopProduct,
    variants?: ProductVariantsValue[],
    draft_id?: number,
    damage_history?: number,
    last_insurance?: number,
    current_insurance_end_date?: string,
  ) {
    if (!isUserLoggedIn(true)) return;

    updateCart(
      await api.addToCart(
        cartItem,
        type,
        variants,
        draft_id,
        damage_history,
        last_insurance,
        current_insurance_end_date,
      ),
    );
    toast("محصول به سبدخرید اضافه شد", { type: "success" });
  },
  async removeFromCart(cartItemId: number) {
    if (!isUserLoggedIn()) return;

    await api.decreaseQuantity(cartItemId);

    updateCart(await api.getCartList());

    toast("محصول از سبدخرید حذف شد", { type: "error", position: "top-left" });
  },
  async increaseQuantity(cartItemId: number) {
    if (!isUserLoggedIn(true)) return;

    try {
      updateCart(await api.increaseQuantity(cartItemId));

      toast("تعداد محصول افزایش یافت", { type: "success" });
    } catch (error) {}
  },
  async decreaseQuantity(cartItemId: number) {
    if (!isUserLoggedIn()) return;

    updateCart(await api.decreaseQuantity(cartItemId));
    toast("تعداد محصول کاهش یافت", { type: "warning", position: "top-left" });
  },
  clearCart() {
    storeCart.setState(initialState, true);
  },
};

const createUseCart = () => {
  cartActions.getCartData();
  return storeCart;
};

export const useCart = createUseCart();
