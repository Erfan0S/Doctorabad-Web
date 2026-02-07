import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import {HeaderType} from "@/types/clinic";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <>
        <ClinicHeader headerPageType={HeaderType.FAVORITES} title="علاقه‌مندی‌های کلینیک من"></ClinicHeader>
        <div>{children}</div>

    </>
  );
}
