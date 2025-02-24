import CourseHeaderSiffix from "@/components/Header/courseHeaderSuffix";
import PageHeader from "@/components/Header/PageHeader";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
    slug: string;
  };
}) {
  return (
    <div>
      <PageHeader title="" suffix={<CourseHeaderSiffix id={params.id} />} />
      <div className="row">{children}</div>
    </div>
  );
}
