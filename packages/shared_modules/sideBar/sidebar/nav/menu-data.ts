import doctorLearn from "../../../assets/img/doctor-learn-new.png";
import doctorMarket from "../../../assets/img/doctor-market-new.png";
import doctorTools from "../../../assets/img/doctor-tools-new.png";
import doctorDownload from "../../../assets/img/doctor-download-new.png";
import doctorExam from "../../../assets/img/doctor-exam-new.png";
import menuLogo from "../../../assets/img/logo-without-text.png";
import { baseUrls, routePath } from "@repo/core/constants/routePath";

export const mobileMenuLogoSchema = {
  id: 0,
  title: "دکترآباد",
  subTitle: "دکترآباد",
  href: baseUrls.base,
  image: menuLogo,
  color: "green",
  active: true,
  mobileTitle: "دکترآباد",
};

export const sidebarMenuData = [
  {
    id: 1,
    title: "دکتـــــــــــــــرلرن",
    subTitle: "مرکزآموزش‌دکترآباد",
    basePath: routePath.learnBasePath,
    href: baseUrls.learn,
    image: doctorLearn,
    color: "red",
    active: false,
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
    active: false,
    mobileTitle: "مرکزخرید",
  },
  {
    id: 3,
    title: "دکتـــــــــرتولز",
    subTitle: "مرکزابزاردکترآباد",
    href: routePath.home,
    basePath: null,
    image: doctorTools,
    color: "green",
    active: false,
    mobileTitle: "",
  },
  {
    id: 4,
    title: "دکتـــــــــــردانلود",
    subTitle: "مرکزمحتوای‌دکترآباد",
    href: baseUrls.download,
    basePath: null,
    image: doctorDownload,
    color: "blue",
    active: false,
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
    active: false,
    mobileTitle: "",
  },
];
