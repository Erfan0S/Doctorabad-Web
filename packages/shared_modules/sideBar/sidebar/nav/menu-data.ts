import doctorLearn from "../../../assets/img/doctor-learn.png";
import doctorMarket from "../../../assets/img/doctor-market.png";
import doctorTools from "../../../assets/img/doctor-tools.png";
import doctorDownload from "../../../assets/img/doctor-download.png";
import doctorExam from "../../../assets/img/doctor-exam.png";
import menuLogo from "../../../assets/img/logo-without-text.png";
import { baseUrls, routePath } from "@repo/core/constants/routePath";

export const mobileMenuLogoSchema = {
  id: 0,
  title: "دکترآباد",
  subTitle: "دکترآباد",
  href: baseUrls.base,
  image: menuLogo,
  color: "green",
  disabled: false,
  mobileTitle: "دکترآباد",
};

export const sidebarMenuData = [
  {
    id: 1,
    title: "دکتـــــــــــــــرلرن",
    subTitle: "مرکزآموزش‌دکترآباد",
    href: baseUrls.learn,
    basePath: routePath.learnBasePath,
    image: doctorLearn,
    color: "red",
    disabled: true,
    mobileTitle: "مرکز‌آموزش",
  },
  {
    id: 2,
    title: "دکتــــــرمارکت",
    subTitle: "مرکزخرید‌دکترآباد",
    href: baseUrls.market,
    basePath: routePath.marketBasePath,
    image: doctorMarket,
    color: "orange",
    disabled: true,
    mobileTitle: "مرکزخرید",
  },
  {
    id: 3,
    title: "دکتـــــــــرتولز",
    subTitle: "مرکزابزاردکترآباد",
    href: "https://doctorabad.com/app",
    basePath: routePath.appDownload,
    image: doctorTools,
    color: "green",
    disabled: false,
    mobileTitle: "",
  },
  {
    id: 4,
    title: "دکتـــــــــــردانلود",
    subTitle: "مرکزمحتوای‌دکترآباد",
    href: "https://doctorabad.com/app",
    basePath: routePath.appDownload,
    image: doctorDownload,
    color: "blue",
    disabled: true,
    mobileTitle: "",
  },
  {
    id: 5,
    title: "دکتـــــــــــراگزم",
    subTitle: "مرکزآزمون‌دکترآباد",
    href: baseUrls.exam,
    basePath: routePath.examBasePath,
    image: doctorExam,
    color: "purple",
    disabled: true,
    mobileTitle: "",
  },
];
