import { authorizeServerPage } from "@repo/core/utils/authUtils";
import BuyInsurancePage from "@/components/BuyInsurancePage/BuyInsurancePage";



export default async function Insurance() {
  await authorizeServerPage();
  return <BuyInsurancePage />;
}

