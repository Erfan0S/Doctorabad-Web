"use client";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import Link from "next/link";
import { ProductListItem } from "../../../common/components";
import { Product } from "@repo/core/types/product";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { marketPaths } from "@repo/core/constants/routePath";
import Hat from "../../../assets/svg/hat";
import { modalActions } from "@repo/core/modal/modals";

type Props = {
  data: Product;
};

function ShoppingFavoriteItem({ data: product }: Props) {
  return (
    <Link
      href={generateSingleProductUrlFromId(
        product.id,
        product.slug,
        OrderType.ShopProduct,
      )}
      onClick={() => modalActions.clearModals()}
    >
      <ProductListItem
        id={product.id.toString()}
        app={Apps.MARKET}
        title={product.title}
        baseUrl={marketPaths.single}
        imageType="square"
        installmentPayment={product.installment_payment}
        attributes={
          !!product.provider ? [{ icon: <Hat />, value: product.provider }] : []
        }
        pic_url={product.product_pic}
        price_main={product.price_main}
        price_off={product.price_amazing || product.price_off}
        haveStock={product.quantity == null || product.quantity > 0}
      />
    </Link>
  );
}

export default ShoppingFavoriteItem;
