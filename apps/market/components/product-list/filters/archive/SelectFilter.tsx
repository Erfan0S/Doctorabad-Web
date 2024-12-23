import Accordion from '@/components/app/accordion';
import style from '../ProductListFiltersFilters.module.scss';
import { useSearchParams } from 'next/navigation';
import { useChangeSearchParamsFilter } from '@/hooks/useChangeSearchParamsFilter';
import { useState } from 'react';

type Props = {
  title: string;
  items: { id: number; title: string }[];
  queryKey: string;
  singleSelection?: boolean;
};

export const SelectFilter = ({ items, queryKey, title, singleSelection }: Props) => {
  const [searchInList, setSearchInList] = useState('');

  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const filter = searchParams.get(queryKey);

  const activeItems = filter ? filter.split(',') : [];
  const changeCategoryFilter = (filterId: number, checked: boolean) => {
    const updatedItems = checked
      ? [...(singleSelection ? [] : activeItems), String(filterId)]
      : activeItems.filter((item) => item !== String(filterId));

    changeFilters({ [queryKey]: updatedItems.length ? updatedItems.join(',') : null });
  };

  const filteredItems = searchInList ? items.filter(({ title }) => title.includes(searchInList)) : items;

  return (
    <Accordion title={title} isActive={!!filter}>
      <div className={style.archiveFiltersCheckboxList}>
        {items.length > 10 && (
          <input
            value={searchInList}
            onChange={(e) => setSearchInList(e.target.value)}
            placeholder={`جستجو در ${title}`}
          />
        )}
        <ul>
          {filteredItems.map(({ id, title }) => {
            const uniqueId = `checkbox_${queryKey}_${id}_id`;
            return (
              <li key={id}>
                <input
                  id={uniqueId}
                  type="checkbox"
                  checked={activeItems.includes(String(id))}
                  onChange={(e) => changeCategoryFilter(id, e.target.checked)}
                />
                <label htmlFor={uniqueId}>
                  <span>{title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </Accordion>
  );
};
