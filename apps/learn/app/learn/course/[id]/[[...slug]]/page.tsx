import Course from "@/components/course";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function CoursePage({ params }: Props) {
  return <Course id={params.id} slug={params.slug} />;
}
