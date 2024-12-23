import Accordion from '@/components/app/accordion';
import { priceFormatter } from '@/utils/priceFormatter';
import Slider from 'rc-slider';
import React, { useEffect, useState } from 'react';
import 'rc-slider/assets/index.css';
import style from '../ProductListFiltersFilters.module.scss';
import useDebounceAction from '@/hooks/useDebounceAction';
import { useChangeSearchParamsFilter } from '@/hooks/useChangeSearchParamsFilter';
import { useSearchParams } from 'next/navigation';

type Props = {
  priceRange: { min: number; max: number };
};

const PriceShow = ({ price }: { price: number }) => {
  return (
    <div>
      <span>{priceFormatter(price)}</span>
      <span style={{ display: 'block' }}>تومان</span>
    </div>
  );
};

export const MinMaxPrice = ({ priceRange }: Props) => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const defaultMin = Number(searchParams.get('min_price'));
  const defaultMax = Number(searchParams.get('max_price'));

  const [values, setValues] = useState([defaultMin || priceRange.min, defaultMax || priceRange.max]);

  const debounceSetFilters = useDebounceAction(([min, max]: number[]) => {
    changeFilters({ min_price: String(min), max_price: String(max) });
  }, 2000);

  useEffect(() => {
    if (values[0] !== priceRange.min || values[1] !== priceRange.max) {
      debounceSetFilters(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Accordion title="محدوده قیمت">
      <div style={{ height: 50, paddingTop: 15 }}>
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
          className={style.archiveFiltersSliderMark}
        />
      </div>
    </Accordion>
  );
};
