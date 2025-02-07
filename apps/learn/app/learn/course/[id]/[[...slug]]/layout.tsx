import CourseHeaderSiffix from "@/components/Header/courseHeaderSuffix";
import PageHeader from "@/components/Header/PageHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader title="" suffix={<CourseHeaderSiffix />} />
      <div className="row">{children}</div>
    </div>
  );
}
