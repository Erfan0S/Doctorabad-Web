import MainPage from "@/components/MainPage/MainPage";
import { Suspense } from "react";

export default async function MedicinePage() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
}
