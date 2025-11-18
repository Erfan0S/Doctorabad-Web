import { authorizeServerPage } from "@repo/core/utils/authUtils";
import MedicineDetailsPage from "@/components/MedicineDetailsPage/MedicineDetailsPage";


export default async function MedicinePage() {
  await authorizeServerPage();
  return <MedicineDetailsPage />;
}