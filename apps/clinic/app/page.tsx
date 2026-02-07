import MainPage from "@/components/MainPage/MainPage";
import { PersistQueryProvider } from "@repo/shared_modules";
export default async function ClinicPage() {
  return (
    <PersistQueryProvider>
      <MainPage />
    </PersistQueryProvider>
  );
}
