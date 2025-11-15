import { authorizeServerPage } from "@repo/core/utils/authUtils";
import MedicineDetailsPage from '@/components/MedicineDetailsPage/MedicineDetailsPage';

export default async function MedicinePage() {
  // چک کردن احراز هویت در سرور
  await authorizeServerPage();
  
  // اگر کاربر لاگین باشه، کامپوننت کلاینت نمایش داده میشه
  return <MedicineDetailsPage />;
}