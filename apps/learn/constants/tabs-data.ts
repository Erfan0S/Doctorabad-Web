import { HomeTabs } from "@/types/courses";
import { MobileHomeHeaderDataConfig } from "@repo/core/types/configs";

export const MainTabsData: MobileHomeHeaderDataConfig[] = [
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
