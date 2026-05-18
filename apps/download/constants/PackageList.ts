import { api } from "@/api/Api";
import { HomePagePackageSliders } from "@/types/homePage";

export const PackageListConfigs = {
  [HomePagePackageSliders.MyPackages]: {
    api: (page: number = 1) => api.getPreviousPackageOrders(page),
    title: "محتواهای من",
    archiveLink: "/my_package",
    queryKey: "my-packages",
    isRefetchOnAuth: true,
  },
  [HomePagePackageSliders.Suggested]: {
    api: (page: number = 1) => api.getPackages(page, "newest", 1),
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/package_list/" + HomePagePackageSliders.Suggested,
    queryKey: "suggested-packages",
  },

  [HomePagePackageSliders.Newest]: {
    api: (page: number = 1) => api.getPackages(page, "newest", 0),
    title: "جدید‌ترین ها",
    archiveLink: "/package_list/" + HomePagePackageSliders.Newest,
    queryKey: "newest-packages",
  },
  [HomePagePackageSliders.BestSelling]: {
    api: (page: number = 1) => api.getPackages(page, "bestselling", 0),
    title: "پرفروش‌ترین ها",
    archiveLink: "/package_list/" + HomePagePackageSliders.BestSelling,
    queryKey: "bestselling-packages",
  },

  [HomePagePackageSliders.LastViewed]: {
    api: (page: number = 1) => api.getUserLastViewedPackages(page),
    title: "آخرین بازدید‌های من",
    archiveLink: null,
    queryKey: "lastviewed-packages",
    isRefetchOnAuth: true,
  },
};
