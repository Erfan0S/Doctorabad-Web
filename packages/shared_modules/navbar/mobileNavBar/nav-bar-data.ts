import doctorLearn from "../../assets/img/doctor-learn-new.png";
import doctorMarket from "../../assets/img/doctor-market-new.png";
import doctorDownload from "../../assets/img/doctor-download-new.png";
import doctorExam from "../../assets/img/doctor-exam-new.png";
import doctorTools from "../../assets/img/doctor-tools-new.png";
import { baseUrls, routePath } from "@repo/core/constants/routePath";

export const navBarData = [
  {
    id: 1,
    title: "دکتـــــــــــــــرلرن",
    subTitle: "مرکزآموزش‌دکترآباد",
    href: baseUrls.learn,
    image: doctorLearn,
    color: "red",
    mobileTitle: "مرکز‌آموزش",
    basePath: routePath.learnBasePath,
  },
  {
    id: 2,
    title: "دکتــــــرمارکت",
    subTitle: "مرکزخرید‌دکترآباد",
    href: baseUrls.market,
    image: doctorMarket,
    color: "orange",
    mobileTitle: "مرکز‌خرید",
    basePath: routePath.marketBasePath,
  },
  {
    id: 0,
    title: "دکتــــــرتولز",
    subTitle: "مرکزابزاردکترآباد",
    href: baseUrls.base,
    image: doctorTools,
    color: "green",
    mobileTitle: "دکترآباد",
    basePath: routePath.home,
  },
  {
    id: 3,
    title: "دکتـــــــــــردانلود",
    subTitle: "مرکزمحتوای‌دکترآباد",
    href: baseUrls.download,
    image: doctorDownload,
    color: "blue",
    mobileTitle: "مرکز‌محتوا",
    basePath: routePath.downloadBasePath,
  },
  {
    id: 4,
    title: "دکتـــــــــــراگزم",
    subTitle: "مرکزآزمون‌دکترآباد",
    href: baseUrls.exam,
    image: doctorExam,
    color: "purple",
    mobileTitle: "مرکز‌آزمون",
    basePath: routePath.examBasePath,
  },
];
