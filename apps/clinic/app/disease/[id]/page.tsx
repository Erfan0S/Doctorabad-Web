import { authorizeServerPage } from "@repo/core/utils/authUtils";
import DiseaseDetailsPage from "@/components/DiseaseDetailsPage/DiseaseDetailsPage";
import { Suspense } from "react";

export default async function DiseasePage() {
  return (
    <Suspense>
      <DiseaseDetailsPage />
    </Suspense>
  );
}
