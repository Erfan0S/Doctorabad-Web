import { api } from "@/api/Api";
import { ProvidersList } from "@/types/providers";
import { AmazingProduct } from "@repo/core/types/product";
import { Banner } from "@/types/banner";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import DesktopMainPage from "@/components/layouts/desktop/MainPage";
import MobileMainPage from "@/components/layouts/mobile/MainPage";

export default async function HomeMarket() {
  let ProvidersList: ProvidersList = [];
  let amazingProducts: {
    data: AmazingProduct[];
    amazing_time: string;
  } = { data: [], amazing_time: "0" };
  let sliders: Banner[] = [];

  try {
    ProvidersList = (await api.getProviders()).data.data;
  } catch (error) {
    console.error("Failed to fetch providers:", error);
  }

  try {
    amazingProducts = (
      await api.getAmazingProductList({ page: "1", limit: "10" })
    ).data;
  } catch (error) {
    console.error("Failed to fetch amazing products:", error);
  }

  try {
    sliders = (await api.getMainSliders()).data.data;
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
  }

  return (
    <DiviceSwitchShell
      MobileComponent={
        <MobileMainPage
          sliders={sliders}
          amazingProducts={amazingProducts}
          ProvidersList={ProvidersList}
        />
      }
      DesktopComponent={
        <DesktopMainPage
          sliders={sliders}
          amazingProducts={amazingProducts}
          ProvidersList={ProvidersList}
        />
      }
    />
  );
}
