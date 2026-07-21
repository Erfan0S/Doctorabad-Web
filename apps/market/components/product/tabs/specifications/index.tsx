import { SingleProduct } from "@repo/core/types/product";
import { Apps } from "@repo/core/types/general";
import { ProductListItem } from "@repo/shared_modules/components";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { OrderType } from "@repo/core/types/cart";
import { ProductListItemProps } from "@repo/core/types/props";

interface Props {
  productData: SingleProduct;
}

const separatorSpanClass =
  "inline-block text-[#f54f1a] pl-[5px] relative ml-[5px] " +
  "[&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:w-px " +
  "[&:not(:last-child)]:after:h-3 [&:not(:last-child)]:after:bg-[#5b5b5b] " +
  "[&:not(:last-child)]:after:inline-block [&:not(:last-child)]:after:absolute " +
  "[&:not(:last-child)]:after:top-[25%] [&:not(:last-child)]:after:left-0";

const tdClass =
  "text-center border-b border-b-gray-light border-l-gray-light border-solid border-0 " +
  "leading-[30px] first-of-type:border-l";

const thClass =
  "bg-market text-white text-center leading-[30px] border-gray-light border-solid border-0 " +
  "first:rounded-tr-lg last:rounded-tl-lg first:border-l";

const ProductSpecifications: React.FC<Props> = ({ productData }) => {
  return (
    <>
      {productData.is_bundle && !!productData.bundled_products?.length && (
        <div className="flex flex-col px-2.5 py-[5px] rounded-[5px] mb-2.5 gap-[15px] [&_a>div]:m-0 [&_a>div]:border [&_a>div]:border-[#d1d1d1]">
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

      <div className="border-2 rounded-xl border-solid border-market">
        <table className="w-full">
          <thead>
            <tr>
              <th className={`${thClass}`}>شناسه محصول</th>
              <th className={thClass}>{productData.sku_code}</th>
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>td]:border-b-0">
            {!!productData.product_type.length && (
              <tr>
                <td className={tdClass}>نوع</td>
                <td className={tdClass}>
                  {productData.product_type.map((e) => (
                    <span key={e.id} className={separatorSpanClass}>
                      {e.title}
                    </span>
                  ))}
                </td>
              </tr>
            )}
            {!!productData.fields.length && (
              <tr>
                <td className={tdClass}>رشته</td>
                <td className={tdClass}>
                  {productData.fields.map((e) => (
                    <span key={e.id} className={separatorSpanClass}>
                      {e.title}
                    </span>
                  ))}
                </td>
              </tr>
            )}
            {!!productData.grades.length && (
              <tr>
                <td className={tdClass}>مقطع</td>
                <td className={tdClass}>
                  {productData.grades.map((e) => (
                    <span key={e.id} className={separatorSpanClass}>
                      {e.title}
                    </span>
                  ))}
                </td>
              </tr>
            )}
            {productData.options.map(({ key, value }) => (
              <tr key={key}>
                <td className={tdClass}>{key}</td>
                <td className={tdClass}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductSpecifications;
