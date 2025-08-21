import { questionBankFilters } from "@/constants/filters";
import { useSearchParams } from "next/navigation";

export default function useGetFilterParams() {
  const Filters = questionBankFilters;
  const searchParams = useSearchParams();
  const query = searchParams?.get("q");
  const field = searchParams?.get(Filters.FIELD);
  const grade = searchParams?.get(Filters.GRADE);
  const lesson = searchParams?.get(Filters.LESSON);
  const date = searchParams?.get(Filters.DATE);
  const place = searchParams?.get(Filters.PLACE);
  const explanation = searchParams?.get(Filters.EXPLANATION);
  const tip = searchParams?.get(Filters.TIP);
  const budgeting = searchParams?.get(Filters.BUDGETING);
  const topics = searchParams?.get(Filters.TOPIC);

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
