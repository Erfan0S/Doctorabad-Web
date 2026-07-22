import Link from "next/link";
import MobileProductListItem from "./MobileProductListItem";
import { ProductListItemProps } from "@repo/core/types/props";
import { Apps } from "@repo/core/types/general";
import { baseUrls } from "@repo/core/constants/routePath";


const StaticMobileProductList = ({
  products,
  emptyErrorMassage,
  app,
}: {
  products: ProductListItemProps[];
  emptyErrorMassage?: string;
  app: Apps;
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col">
        <p style={{ textAlign: "center", padding: "20px" }}>
          {emptyErrorMassage ? emptyErrorMassage : "هیچ محصولی یافت نشد"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {products.map((p) => {
        const itemApp = p.app || app;

        return (
          <Link href={`/${p.baseUrl}/${p.id}`} key={p.id}>
            <MobileProductListItem { ...(app === Apps.DOWNLOAD ? { imageType: "portrait", haveStock: false } : {}) } app={app} {...p} />
          </Link>
        );
      })}
    </div>
  );
};

export default StaticMobileProductList;
