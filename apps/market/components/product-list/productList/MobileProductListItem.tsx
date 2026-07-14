import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { ProductListItem } from "@repo/shared_modules/components";
import Hat from "@repo/shared_modules/icons/hat";
import Link from "next/link";
import React from "react";
import { Product as ProductType } from "@repo/core/types/product";
import { Apps } from "@repo/core/types/general";
import { marketPaths } from "@repo/core/constants/routePath";
import { OrderType } from "@repo/core/types/cart";
import style from "./ProductList.module.scss";

type Props = {
  product: ProductType;
};

function MobileProductListItem({ product }: Props) {
  return (
    <Link
      href={generateSingleProductUrlFromId(
        product.id,
        product.slug,
        OrderType.ShopProduct,
      )}
    >
      <ProductListItem
        id={product.id.toString()}
        app={Apps.MARKET}
        title={product.title}
        baseUrl={marketPaths.single}
        imageType="square"
        installmentPayment={product.installment_payment}
        attributes={
          !!product.provider
            ? [
                {
                  icon: <Hat />,
                  value: (
                    <span className={style.productListItemProvider}>
                      {product.provider}
                    </span>
                  ),
                },
              ]
            : []
        }
        pic_url={product.product_pic}
        price_main={product.price_main}
        price_off={product.price_amazing || product.price_off}
        haveStock={product.quantity == null || product.quantity > 0}
      />
    </Link>
  );
}

export default MobileProductListItem;
