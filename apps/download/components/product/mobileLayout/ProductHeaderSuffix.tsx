"use client";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";
import { SingleProduct } from "@repo/core/types/product";
import { MobileHeaderBaseSiffix } from "@repo/shared_modules/headers";
import React from "react";

type Props = {
  product: SingleProduct;
};

function ProductHeaderSuffix({ product }: Props) {
  return (
    <MobileHeaderBaseSiffix
      id={product.id}
      app={Apps.MARKET}
      initialFavorite={!!product.user_favorite}
      shareAction={async () => {
        const res = await api.shareProduct(product.id);

        return {
          title: res.data.data.title,
          description: res.data.data.description,
          url: res.data.data.product_url,
        };
      }}
      favoriteAction={async (isFavorite) => {
        await api[!isFavorite ? "addToFavorite" : "removeFromFavorite"](
          product.id,
        );
      }}
    />
  );
}

export default ProductHeaderSuffix;
