import MainPage from "@/components/MainPage/MainPage";
import { PersistQueryProvider } from "@repo/shared_modules";
import Providers from "@/providers/providers";
import InsuranceHeader from "@/components/InsuranceHeader/InsuranceHeader";
import { HeaderType } from "@/types/insurance";

export default async function ClinicPage() {
  return (
    <>
      <InsuranceHeader headerPageType={HeaderType.OTHERS} title="بیمه من" />
      <MainPage />
    </>
  );
}
