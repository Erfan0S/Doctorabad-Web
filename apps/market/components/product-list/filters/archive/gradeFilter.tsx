import { api } from "@/api/Api";
import Accordion from "@/components/app/accordion";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { SelectFilter } from "./SelectFilter";
import { useEffect } from "react";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import { FilterParams } from "@/constants/filter";

export const GradeFilter = () => {
  const isInitialized = useClientComponentInitiated();

  const searchParams = useSearchParams();
  const changeFilters = useChangeSearchParamsFilter();

  const fieldFilter = searchParams?.get(FilterParams.Field);

  const { data, isLoading, fetchStatus } = useQuery({
    queryFn: () => api.getGrades(Number(fieldFilter), 5),
    queryKey: ["grades", fieldFilter],
    enabled: !!fieldFilter,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isInitialized) {
      changeFilters({ [FilterParams.Grade]: null });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldFilter]);

  if (!fieldFilter || isLoading) {
    return (
      <Accordion title={"موضوع"} isActive={false}>
        <p style={{ margin: "8px 0" }}>
          {isLoading
            ? "در حال دریافت لیست موضوعات"
            : "ابتدا رشته را انتخاب کنید"}
        </p>
      </Accordion>
    );
  }

  return (
    <SelectFilter
      items={data!.data!.data}
      queryKey={FilterParams.Grade}
      title={"موضوع"}
    />
  );
};
