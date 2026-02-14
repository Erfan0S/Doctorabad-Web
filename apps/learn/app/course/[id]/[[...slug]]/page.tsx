import { api } from "@/api/Api";
import Course from "@/components/course";
import { LessonVideoProvider } from "@/context/LessonVideoContext";
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
    const { data } = await api.getCourse(Number(params.id));

    if (!data.data) {
      return notFound();
    }

    return (
      <LessonVideoProvider>
        <Course
          course={data.data}
          lessonParam={searchParams.lesson}
          activeTab={searchParams.tab}
        />
      </LessonVideoProvider>
    );
  } catch (error) {
    notFound();
  }
}
