import { api } from "@/api/Api";
import Course from "@/components/course";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function CoursePage({ params }: Props) {
  try {
    const { data } = await api.getCourse(Number(params.id));

    return <Course course={data.data} />;
  } catch (error) {
    notFound();
  }
}
