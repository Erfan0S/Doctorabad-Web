import { api } from "@/api/Api";
import Package from "@/components/package/Package";
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

export default async function PackagePage({ params, searchParams }: Props) {
  try {
    const { data } = await api.getPackage(Number(params.id));

    if (!data.data) {
      return notFound();
    }

    return (
      <Package
        packageItem={data.data}
        activeTab={searchParams.tab}
      />
    );
  } catch (error) {
    notFound();
  }
}
