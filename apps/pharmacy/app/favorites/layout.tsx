import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import {HeaderType} from "@/types/pharmacy";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <>
        <PharmacyHeader headerPageType={HeaderType.FAVORITES} title="علاقه‌مندی‌های داروخانه من"></PharmacyHeader>
        <div>{children}</div>

    </>
  );
}
