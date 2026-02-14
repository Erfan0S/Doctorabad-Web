import { HomeTabs } from "@/types/courses";
import { MobileTabsConfig } from "@repo/core/types/configs";

export const MainTabsData: MobileTabsConfig[] = [
  {
    id: HomeTabs.COURSES,
    title: "دوره‌ها",
    url: "/",
  },
  {
    id: HomeTabs.CATEGORIES,
    title: "موضوعات",
    url: "/categories",
  },

  {
    id: HomeTabs.PROVIDERS,
    title: "ارائه‌دهنده‌ها",
    url: "/providers",
  },
];
