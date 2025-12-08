import { authorizeServerPage } from "@repo/core/utils/authUtils";
import DiseaseDetailsPage from "@/components/DiseaseDetailsPage/DiseaseDetailsPage";



export default async function DiseasePage() {
  await authorizeServerPage();
  return <DiseaseDetailsPage />;
}

