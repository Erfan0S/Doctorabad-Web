import { SingleProduct } from "@repo/core/types/product";
import style from "./ProductSpecifications.module.scss";
import { Apps } from "@repo/core/types/general";
import { ProductListItem } from "@repo/shared_modules/components";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { OrderType } from "@repo/core/types/cart";
import { ProductListItemProps } from "@repo/core/types/props";
interface Props {
  productData: SingleProduct;
}
const ProductSpecifications: React.FC<Props> = ({ productData }) => {
  return (
    <>
      {productData.is_bundle && !!productData.bundled_products?.length && (
        <div className={style.productBundleWrapper}>
          {productData.bundled_products.map((product) => {
            const imageType: () => ProductListItemProps["imageType"] = () => {
              switch (product.type) {
                case OrderType.Course:
                  return "landscape";
                case OrderType.ShopProduct:
                  return "square";
                case OrderType.Package:
                  return "portrait";
                default:
                  return "auto";
              }
            };

            return (
              <a
                href={generateSingleProductUrlFromId(
                  product.id,
                  "",
                  product.type,
                )}
                target="_blank"
              >
                <ProductListItem
                  app={Apps.MARKET}
                  id={product.id?.toString()}
                  title={product.title}
                  pic_url={product.picture}
                  imageType={imageType()}
                  providerTitle={product.provider_name}
                />
              </a>
            );
          })}
        </div>
      )}

      <div className={style.productSpecifications}>
        <table>
          <thead>
            <tr>
              <th>شناسه محصول</th>
              <th>{productData.sku_code}</th>
            </tr>
          </thead>
          <tbody>
            {!!productData.product_type.length && (
              <tr>
                <td>نوع</td>
                <td>
                  {productData.product_type.map((e) => (
                    <span key={e.id}>{e.title}</span>
                  ))}
                </td>
              </tr>
            )}
            {!!productData.fields.length && (
              <tr>
                <td>رشته</td>
                <td>
                  {productData.fields.map((e) => (
                    <span key={e.id}>{e.title}</span>
                  ))}
                </td>
              </tr>
            )}
            {!!productData.grades.length && (
              <tr>
                <td>مقطع</td>
                <td>
                  {productData.grades.map((e) => (
                    <span key={e.id}>{e.title}</span>
                  ))}
                </td>
              </tr>
            )}
            {productData.options.map(({ key, value }) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductSpecifications;
