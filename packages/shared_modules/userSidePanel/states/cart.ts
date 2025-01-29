import { create } from "zustand";
import { CartResponse, CartState, Order } from "@repo/core/types";
import { api } from "../../api/Api";

import { ResponseType } from "@repo/core/types";
import { toast } from "react-toastify";
import { ProductVariantsValue } from "@repo/core/types";

const initialState = { data: [] as Order[], initLoading: true } as CartState;

export const useCart = create<CartState>(() => initialState);

const updateCart = (response: ResponseType<CartResponse>) =>
  useCart.setState({ ...response.data, initLoading: false });

export const cartActions = {
  async getCartData() {
    updateCart(await api.getCartList());
  },
  async addToCart(cartItem: number, variants: ProductVariantsValue[]) {
    updateCart(await api.addToCart(cartItem, variants));
    toast("محصول به سبدخرید اضافه شد", { type: "success" });
  },
  async removeFromCart(cartItemId: number) {
    await api.removeFromCart(cartItemId);

    await this.getCartData();

    toast("محصول از سبدخرید حذف شد", { type: "error", position: "top-left" });
  },
  async increaseQuantity(cartItemId: number) {
    try {
      updateCart(await api.increaseQuantity(cartItemId));

      toast("تعداد محصول افزایش یافت", { type: "success" });
    } catch (error) {}
  },
  async decreaseQuantity(cartItemId: number) {
    updateCart(await api.decreaseQuantity(cartItemId));
    toast("تعداد محصول کاهش یافت", { type: "warning", position: "top-left" });
  },
  clearCart() {
    useCart.setState(initialState, true);
  },
};
