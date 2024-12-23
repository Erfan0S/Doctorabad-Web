'use client';
import style from '../ProductListFiltersFilters.module.scss';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChangeSearchParamsFilter } from '@/hooks/useChangeSearchParamsFilter';
import useDebounceAction from '@/hooks/useDebounceAction';

const SearchFilters = () => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const search = searchParams.get('search');

  const [searchText, setSearchText] = useState(() => search || '');

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const changeSearchParam = useCallback(
    (search: string | null) => {
      if (search) changeFilters({ search: search });
    },
    [changeFilters]
  );

  const DebounceChangeSearchParam = useDebounceAction(changeSearchParam, 1000);

  useEffect(() => {
    DebounceChangeSearchParam(searchText);
  }, [searchText]);

  useEffect(() => {
    setSearchText(search!);
  }, [search]);

  return (
    <aside className={style.archiveFilters}>
      <div className={`${style.archiveFiltersContent}`}>
        <span>جستجو</span>
        <div className={style.archiveFiltersCheckboxList}>
          <input value={searchText} onChange={changeSearchText} placeholder="نام محصول" />
        </div>
      </div>
    </aside>
  );
};
export default SearchFilters;
