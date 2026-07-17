import {
  BundleProducts,
  SingleProductAttribute,
} from "@repo/core/types/product";
import Product from "@/components/common/product";

// orange-bordered spec table
const TH_CLASS =
  "border-e border-solid border-gray bg-orange text-center leading-[30px] text-white first-of-type:rounded-ss-md last-of-type:rounded-se-md last-of-type:border-e-0";
const TD_CLASS =
  "border-b border-e border-solid border-gray text-center leading-[30px] last-of-type:border-e-0";
// comma-less tag list separated by thin vertical bars
const SPEC_TAG =
  "relative me-[5px] inline-block pe-[5px] text-[#f54f1a] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:end-0 [&:not(:last-child)]:after:top-1/4 [&:not(:last-child)]:after:inline-block [&:not(:last-child)]:after:h-3 [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-[#5b5b5b] [&:not(:last-child)]:after:content-['']";

interface Props {
  specifications: SingleProductAttribute[];
  bundleProducts?: BundleProducts[];
}
const ProductSpecifications: React.FC<Props> = ({
  specifications,
  bundleProducts,
}) => {
  return (
    <div>
      {bundleProducts?.length ? (
        <div className="mb-[10px] flex flex-col gap-[15px] rounded-[5px] px-[10px] py-[5px] [&>a>div]:m-0 [&>a>div]:border [&>a>div]:border-solid [&>a>div]:border-gray-light">
          {bundleProducts.map((product) => (
            <Product
              key={product.id}
              productData={{ ...product, price_main: 0 }}
              hidePrice
            />
          ))}
        </div>
      ) : null}
      {specifications.length ? (
        <table className="w-full rounded-lg border-2 border-solid border-orange">
          <thead>
            <tr>
              <th className={TH_CLASS}>عنوان</th>
              <th className={TH_CLASS}>نوع</th>
              <th className={TH_CLASS}>رشته</th>
              <th className={TH_CLASS}>پایه</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-of-type_td]:border-b-0">
            {specifications.map((specification, index) => (
              <tr key={index}>
                <td className={TD_CLASS}>{specification.title}</td>
                <td className={TD_CLASS}>
                  {specification.types.map((type) => (
                    <span key={type} className={SPEC_TAG}>
                      {type}
                    </span>
                  ))}
                </td>
                <td className={TD_CLASS}>
                  {specification.fields.map((field) => (
                    <span key={field} className={SPEC_TAG}>
                      {field}
                    </span>
                  ))}
                </td>
                <td className={TD_CLASS}>
                  {specification.grades.map((grade) => (
                    <span key={grade} className={SPEC_TAG}>
                      {grade}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ProductSpecifications;
