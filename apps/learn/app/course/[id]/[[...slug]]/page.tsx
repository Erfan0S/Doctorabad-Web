import { api } from "@/api/Api";
import Course from "@/components/course";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function CoursePage({ params }: Props) {
  const { data } = await api.getCourse(Number(params.id));

  return <Course course={data.data} />;
}
