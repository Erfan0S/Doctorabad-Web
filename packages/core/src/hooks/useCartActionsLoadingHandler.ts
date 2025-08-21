import { useState } from "react";

export const useCartActionsLoadingHandler = () => {
  const [updateCartLoading, setUpdateCartLoading] = useState(false);

  const cartActionsLoadingHandler = (fn: () => Promise<any>) => () => {
    if (updateCartLoading) return;
    setUpdateCartLoading(true);
    fn().finally(() => setUpdateCartLoading(false));
  };

  return { updateCartLoading, cartActionsLoadingHandler };
};
