import MainPage from "@/components/MainPage/MainPage";
import { PersistQueryProvider } from "@repo/shared_modules";
import Providers from "@/providers/providers";

export default async function ClinicPage() {
  return (
    <Providers>
      <MainPage />
    </Providers>
  );
}
