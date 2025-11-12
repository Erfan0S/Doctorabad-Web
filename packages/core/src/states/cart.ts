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

export const useCart = create<CartState>(() => initialState);

const updateCart = (response: ResponseType<CartResponse>) =>
  useCart.setState({ ...response.data, initLoading: false });

export const cartActions = {
  async getCartData() {
    if (!isUserLoggedIn()) return;
    updateCart(await api.getCartList());
  },
  async addToCart(
    cartItem: number,
    type: OrderType = OrderType.ShopProduct,
    variants?: ProductVariantsValue[]
  ) {
    if (!isUserLoggedIn(true)) return;

    updateCart(await api.addToCart(cartItem, type, variants));
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
    useCart.setState(initialState, true);
  },
};
