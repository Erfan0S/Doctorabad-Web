import React from "react";
import { CheckoutPage as Checkout } from "@repo/shared_modules/checkout";
import { CheckoutPageTypes } from "@repo/core/types/cart";

function ChecoutPage() {
  return <Checkout type={CheckoutPageTypes.Learn} />;
}

export default ChecoutPage;
