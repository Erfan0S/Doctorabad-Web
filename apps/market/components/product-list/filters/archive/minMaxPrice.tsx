import Accordion from "@/components/app/accordion";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { useSearchParams } from "next/navigation";
import { FilterParams } from "@/constants/filter";

// ponytail: physical `left` kept on the last mark - rc-slider positions marks
// with inline LTR `left` values, so logical properties don't apply here
const SLIDER_CLASS =
  "[&_.rc-slider-track]:bg-orange [&_.rc-slider-handle]:border-orange [&_.rc-slider-mark-text:last-child]:!left-[calc(100%-10px)]";

type Props = {
  priceRange: { min: number; max: number };
  extandable?: boolean;
};

const PriceShow = ({ price }: { price: number }) => {
  return (
    <div>
      <span>{priceFormatter(price)}</span>
      <span style={{ display: "block" }}>تومان</span>
    </div>
  );
};

export const MinMaxPrice = ({ priceRange, extandable = true }: Props) => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const defaultMin = Number(searchParams?.get(FilterParams.MinPrice));
  const defaultMax = Number(searchParams?.get(FilterParams.MaxPrice));

  const [values, setValues] = useState([
    defaultMin || priceRange.min,
    defaultMax || priceRange.max,
  ]);

  const debounceSetFilters = useDebounceAction(([min, max]: number[]) => {
    changeFilters({
      [FilterParams.MinPrice]: String(min),
      [FilterParams.MaxPrice]: String(max),
    });
  }, 2000);

  useEffect(() => {
    if (values[0] !== priceRange.min || values[1] !== priceRange.max) {
      debounceSetFilters(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  function SliderComponent() {
    return (
      <Slider
        min={priceRange.min}
        max={priceRange.max}
        marks={{
          [priceRange.min]: <PriceShow price={values[0]} />,
          [priceRange.max]: <PriceShow price={values[1]} />,
        }}
        step={1000}
        range
        onChange={(values) => setValues(values as number[])}
        value={values}
        className={SLIDER_CLASS}
      />
    );
  }

  return extandable ? (
    <Accordion title="محدوده قیمت">
      <div style={{ height: 50, paddingTop: 15 }}>{SliderComponent()}</div>
    </Accordion>
  ) : (
    SliderComponent()
  );
};
