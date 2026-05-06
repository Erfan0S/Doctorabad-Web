import { HomeTabs } from "@/types/courses";
import { MobileTabsConfig } from "@repo/core/types/configs";

export const MainTabsData: MobileTabsConfig[] = [
  {
    id: HomeTabs.PACKAGES,
    title: "محتواها",
    url: "/",
  },
  {
    id: HomeTabs.COLLECTIONS,
    title: "مجموعه‌ها",
    url: "/collections",
  },

  {
    id: HomeTabs.PUBLISHERS,
    title: "ناشران",
    url: "/publishers",
  },
];
