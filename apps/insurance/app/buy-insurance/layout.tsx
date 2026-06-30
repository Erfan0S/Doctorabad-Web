import { HeaderType } from "@/types/insurance";
import InsuranceHeader from "@/components/InsuranceHeader/InsuranceHeader";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
        <div>
        <InsuranceHeader headerPageType={HeaderType.INSURANCE_DETAILS} title="" />
          {children}</div>

    </>
  );
}

