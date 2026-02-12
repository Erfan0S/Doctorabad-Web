import React from "react";
import { ProvidersList } from "@/types/providers";
import { AmazingProduct } from "@repo/core/types/product";
import { Banner } from "@/types/banner";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";
import { MobileHomeHeaderDataConfig } from "@repo/core/types/configs";

type Props = {
  sliders: Banner[];
  amazingProducts: { data: AmazingProduct[]; amazing_time: string };
  ProvidersList: ProvidersList;
};

const TabsData: MobileHomeHeaderDataConfig[] = [
  {
    id: "1",
    title: "محصولات",
    url: "/",
  },
  {
    id: "2",
    title: "مجموعه‌ها",
    url: "/collections",
  },
  {
    id: "3",
    title: "فروشندگان",
    url: "/providers",
  },
];

function MobileMainPage() {
  return (
    <>
      <div>
        <MobileHomeHeader type={Apps.MARKET} tabData={TabsData} haveSearch />
        <div> mobile layout </div>
      </div>
    </>
  );
}

export default MobileMainPage;
