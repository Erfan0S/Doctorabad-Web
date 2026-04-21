import { SingleProduct } from "@repo/core/types/product";
import style from "./ProductSidebarAttribute.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  updateProductPrice,
  variantsSorter,
} from "@repo/core/utils/variantsUtils";
import OptionSwitch from "@/components/common/optionSwithch";
import {
  ProductVariants,
  ProductVariantsValue,
  ProductVariantsValues,
  Variant,
  VariantsCheckBox,
} from "@repo/core/types/productVariants";

interface Props {
  product: SingleProduct;
  setProduct: Dispatch<SetStateAction<SingleProduct>>;
  basePriceMain: number;
  basePriceOff: number;
  baseAmazingPrice: number | null;
  productVariants: Dispatch<SetStateAction<ProductVariantsValue[]>>;
}

const ProductSidebarAttribute: React.FC<Props> = ({
  product,
  setProduct,
  basePriceMain,
  basePriceOff,
  baseAmazingPrice,
  productVariants,
}) => {
  const { checkbox, selections }: ProductVariants = variantsSorter(
    product.variants
  );
  const [values, setValues] = useState<ProductVariantsValues>({});

  useEffect(() => {
    let { addedPrice, subtractedPrice } = updateProductPrice(values, product);

    let mainPrice = basePriceMain + addedPrice;

    setProduct((prev) => ({
      ...prev,
      price_main: mainPrice,
      price_off: basePriceOff
        ? basePriceOff + addedPrice - subtractedPrice
        : subtractedPrice
          ? mainPrice - subtractedPrice
          : 0,
      price_amazing: baseAmazingPrice
        ? baseAmazingPrice + addedPrice - subtractedPrice
        : null,
    }));

    productVariants(
      Object.values(values).map((v) => ({
        ...v,
        user_explanation:
          v.user_explanation == null ? "null" : v.user_explanation,
      }))
    );
  }, [values, setValues]);

  const setVariantValues = (variant: {
    explanation?: string | null;
    category: string;
    id: string | number;
  }) => {
    setValues((prev) => ({
      ...prev,
      [variant.category]: {
        ...prev[variant.category],
        id: variant.id,
        option_title: variant.category,
        user_explanation: variant?.explanation || null,
      },
    }));
  };

  const deleteVariantValues = (category: string) => {
    setValues((prev) => {
      const tempValues = { ...prev };
      delete tempValues[category];
      return tempValues;
    });
  };

  const showSelectionsInput = (variant: Variant[], category: string) => {
    if (!values[category]) return;

    const selectedVariant = variant.find((v) => v.id == values[category].id);

    return selectedVariant?.need_user_explanation ? (
      <li>
        <input
          placeholder={`توضیحات ${category} را وارد کنید.`}
          onChange={(e) => {
            const {
              id,
              option_title: VCategory,
              user_explanation: explanation,
            } = values[category];

            setVariantValues({
              id,
              category: VCategory,
              explanation: e.target.value,
            });
          }}
          value={values[category] ? values[category].user_explanation! : ""}
        />
      </li>
    ) : undefined;
  };

  const optionSwitchesInput = (variant: VariantsCheckBox) => {
    return variant.variants[0].need_user_explanation ? (
      <input
        placeholder={`توضیحات ${variant.category} را وارد کنید.`}
        onChange={(e) => {
          const {
            id,
            option_title: category,
            user_explanation: explanation,
          } = values[variant.category];

          setVariantValues({
            id,
            category,
            explanation: e.target.value,
          });
        }}
        value={
          values[variant.category]
            ? values[variant.category].user_explanation!
            : ""
        }
      />
    ) : null;
  };

  return (
    <div className={style.productSidebarAttribute}>
      <ul>
        {Object.entries(selections).map(([category, variant], index) => {
          return (
            <li key={index}>
              <select
                onChange={(e) => {
                  setVariantValues({
                    id: e.target.value,
                    category: category,
                  });
                }}
              >
                <option disabled selected>
                  انتخاب {category}
                </option>

                {variant.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.option_value}
                  </option>
                ))}
              </select>
              {showSelectionsInput(variant, category)}
            </li>
          );
        })}
        {checkbox.map((variant) => (
          <OptionSwitch
            key={variant.variants[0].id}
            id={variant.variants[0].id.toString()}
            title={variant.variants[0].option_value}
            onToggle={(state) => {
              state
                ? setVariantValues({
                    id: variant.variants[0].id,
                    category: variant.category,
                  })
                : deleteVariantValues(variant.category);
            }}
            activeSwitchComponent={optionSwitchesInput(variant)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductSidebarAttribute;
