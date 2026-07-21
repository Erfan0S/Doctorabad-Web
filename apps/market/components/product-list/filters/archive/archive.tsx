"use client";
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
    <aside className="market-panel market-orange-scrollbar sticky top-[168px] mb-10 max-h-[730px] overflow-scroll p-6 max-md:mb-4">
      <>
        <div className="mb-6 flex items-center font-semibold max-xl:mb-0 max-xl:[&_span]:cursor-pointer">
          <span onClick={toggleMobileMenu}>فیلتر ها</span>
          <span
            className="ms-auto cursor-pointer border-0 border-b border-solid border-orange text-orange"
            onClick={() => push(pathname)}
          >
            حذف همه فیلتر ها
          </span>
        </div>
        {/* filters stay visible on desktop; toggle only applies below xl */}
        <div
          className={`${showMobileMenu ? "max-xl:block" : "max-xl:hidden"} max-xl:pt-3`}
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
