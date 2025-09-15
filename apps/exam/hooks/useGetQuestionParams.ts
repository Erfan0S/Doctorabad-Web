import { SharedFilters } from "@repo/apps_shared_components/exam/types/filters.ts";
import { useSearchParams } from "next/navigation";

export default function useGetFilterParams() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q");
  const field = searchParams?.get(SharedFilters.FIELD);
  const grade = searchParams?.get(SharedFilters.GRADE);
  const lesson = searchParams?.get(SharedFilters.LESSON);
  const date = searchParams?.get(SharedFilters.DATE);
  const place = searchParams?.get(SharedFilters.PLACE);
  const explanation = searchParams?.get(SharedFilters.EXPLANATION);
  const tip = searchParams?.get(SharedFilters.TIP);
  const budgeting = searchParams?.get(SharedFilters.BUDGETING);
  const topics = searchParams?.get(SharedFilters.TOPIC);

  const params = {
    query,
    field,
    grade,
    lesson,
    date,
    place,
    explanation,
    tip,
    budgeting,
    topics,
    searchParams,
  };

  return params;
}
