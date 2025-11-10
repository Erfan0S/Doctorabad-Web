import doctorLearn from "../../assets/img/doctor-learn.png";
import doctorMarket from "../../assets/img/doctor-market.png";
import doctorDownload from "../../assets/img/doctor-download.png";
import doctorExam from "../../assets/img/doctor-exam.png";
import menuLogo from "../../assets/img/logo-without-text.png";
import { baseUrls } from "@repo/core/constants/routePath";

export const navBarData = [
  {
    id: 1,
    title: "دکتـــــــــــــــرلرن",
    subTitle: "مرکزآموزش‌دکترآباد",
    href: baseUrls.learn,
    image: doctorLearn,
    color: "red",
    mobileTitle: "مرکز‌آموزش",
  },
  {
    id: 2,
    title: "دکتــــــرمارکت",
    subTitle: "مرکزخرید‌دکترآباد",
    href: baseUrls.market,
    image: doctorMarket,
    color: "orange",
    mobileTitle: "مرکز‌خرید",
  },
  {
    id: 0,
    title: "دکترآباد",
    subTitle: "دکترآباد",
    href: baseUrls.base,
    image: menuLogo,
    color: "green",
    mobileTitle: "دکترآباد",
  },
  {
    id: 3,
    title: "دکتـــــــــــردانلود",
    subTitle: "مرکزمحتوای‌دکترآباد",
    href: "https://doctorabad.com/app",
    image: doctorDownload,
    disabled: true,
    color: "blue",
    mobileTitle: "مرکز‌محتوا",
  },
  {
    id: 4,
    title: "دکتـــــــــــراگزم",
    subTitle: "مرکزآزمون‌دکترآباد",
    href: baseUrls.exam,
    image: doctorExam,
    color: "purple",
    mobileTitle: "مرکز‌آزمون",
  },
];
