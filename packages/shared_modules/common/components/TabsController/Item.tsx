"use client";
import { MobileTabsConfig } from "@repo/core/types/configs";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";

type Props = {
  tabData: MobileTabsConfig;
  isActive?: boolean;
  url?: string;
  haveLoading?: boolean;
};

const Item = ({ tabData, url, isActive, haveLoading = true }: Props) => {
  const router = useRouter();
  const topLoader = useTopLoader();

  const changeTab = () => {
    if (!!url && haveLoading) {
      topLoader.start();
    }
    if (!!window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    router.push(url ? url : `?tab=${tabData.id}`);
  };

  return (
    <li
      key={tabData.id}
      className={isActive ? "!font-bold before:!bg-app-base" : ""}
      onClick={changeTab}
    >
      {tabData.title}
    </li>
  );
};

export default Item;
