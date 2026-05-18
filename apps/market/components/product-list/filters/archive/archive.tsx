"use client";
import style from "../ProductListFiltersFilters.module.scss";
import { useEffect, useReducer } from "react";
import { CategoryList } from "@/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProvidersList } from "@/types/providers";
import { MinMaxPrice } from "./minMaxPrice";
import { SelectFilter } from "./SelectFilter";
import { SelectionItem } from "@repo/core/types/general";
import { GradeFilter } from "./gradeFilter";
import { FilterParams } from "@/constants/filter";

interface Props {
  categories: CategoryList;
  providers: ProvidersList;
  productTypes: { id: number; title: string }[];
  fields: SelectionItem[];
  priceRange: { min: number; max: number };
}

const ArchiveFilters = ({
  categories,
  providers,
  productTypes,
  priceRange,
  fields,
}: Props) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const [showMobileMenu, toggleMobileMenu] = useReducer((prev) => !prev, false);

  return (
    <aside className={style.archiveFilters}>
      <>
        <div className={style.archiveFiltersHeader}>
          <span onClick={toggleMobileMenu}>فیلتر ها</span>
          <span
            className={style.archiveFiltersClearAll}
            onClick={() => push(pathname)}
          >
            حذف همه فیلتر ها
          </span>
        </div>
        <div
          className={`${style.archiveFiltersContent} ${showMobileMenu ? style.open : ""}`}
        >
          <SelectFilter
            title="دسته‌بندی"
            items={categories}
            queryKey={FilterParams.Category}
          />
          <SelectFilter
            singleSelection
            title="رشته"
            items={fields}
            queryKey={FilterParams.Field}
          />
          <GradeFilter />
          <SelectFilter
            title="فروشنده"
            items={providers.map(({ id, name }) => ({ id, title: name }))}
            queryKey={FilterParams.Provider}
          />
          <SelectFilter
            title="نوع محصول"
            items={productTypes}
            queryKey={FilterParams.ProductType}
          />
          <MinMaxPrice priceRange={priceRange} />
        </div>
      </>
    </aside>
  );
};

export default ArchiveFilters;
