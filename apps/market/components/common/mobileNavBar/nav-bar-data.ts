import doctorLearn from "@/assets/img/doctor-learn.png";
import doctorMarket from "@/assets/img/doctor-market.png";
import doctorDownload from "@/assets/img/doctor-download.png";
import doctorExam from "@/assets/img/doctor-exam.png";
import menuLogo from "@/assets/img/logo-without-text.png";
import { routePath } from "@repo/core/constants";

export const navBarData = [
  {
    id: 1,
    title: "دکتـــــــــــــــرلرن",
    subTitle: "مرکزآموزش‌دکترآباد",
    href: "https://doctorabad.com/app",
    image: doctorLearn,
    color: "red",
    mobileTitle: "مرکز‌آموزش",
  },
  {
    id: 2,
    title: "دکتــــــرمارکت",
    subTitle: "مرکزخرید‌دکترآباد",
    href: routePath.marketBasePath,
    image: doctorMarket,
    color: "orange",
    mobileTitle: "مرکز‌خرید",
  },
  {
    id: 0,
    title: "دکترآباد",
    subTitle: "دکترآباد",
    href: "/",
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
    color: "blue",
    mobileTitle: "مرکز‌محتوا",
  },
  {
    id: 4,
    title: "دکتـــــــــــراگزم",
    subTitle: "مرکزآزمون‌دکترآباد",
    href: "https://doctorabad.com/app",
    image: doctorExam,
    color: "purple",
    mobileTitle: "مرکز‌آزمون",
  },
];
