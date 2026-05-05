import { api } from "@/api/Api";
import Course from "@/components/course";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {
    lesson?: string;
    tab?: string;
  };
};

export default async function CoursePage({ params, searchParams }: Props) {
  try {
    const { data } = await api.getPackage(Number(params.id));

    if (!data.data) {
      return notFound();
    }

    return (
      <Course
        course={data.data}
        activeTab={searchParams.tab}
      />
    );
  } catch (error) {
    notFound();
  }
}
