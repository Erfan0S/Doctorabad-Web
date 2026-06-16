import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import { HeaderType } from "@/types/clinic";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClinicHeader headerPageType={HeaderType.CATEGORY} title="دسته‌بندی"></ClinicHeader>
      {children}
    </>
  );
}
