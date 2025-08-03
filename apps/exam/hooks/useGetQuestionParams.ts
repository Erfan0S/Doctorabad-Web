import {useSearchParams} from "next/navigation";

export default function useGetQuestionParams() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query");
  const field = searchParams?.get("field");
  const grade = searchParams?.get("grade");
  const lesson = searchParams?.get("lesson");
  const date = searchParams?.get("date");
  const place = searchParams?.get("place");
  const explanation = searchParams?.get("explanation");
  const tip = searchParams?.get("tip");
  const budgeting = searchParams?.get("budgeting");
  const topics = searchParams?.get("topics");

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
  };

  return params;
}
