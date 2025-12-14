import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import { HeaderType } from "@/types/pharmacy";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="Maintenance Fluids"></PharmacyHeader>
      {children}
    </>
  );
}
