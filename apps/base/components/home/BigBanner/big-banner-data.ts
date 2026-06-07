import person01 from "@/assets/img/bigBanner/people/0002.png";
import person02 from "@/assets/img/bigBanner/people/0003.png";
import person03 from "@/assets/img/bigBanner/people/0004.png";
import person04 from "@/assets/img/bigBanner/people/0005.png";
import person05 from "@/assets/img/bigBanner/people/0006.png";
import person06 from "@/assets/img/bigBanner/people/0007.png";
import icon01 from "@/assets/img/bigBanner/icons/01.png";
import icon02 from "@/assets/img/bigBanner/icons/02.png";
import icon03 from "@/assets/img/bigBanner/icons/03.png";
import icon04 from "@/assets/img/bigBanner/icons/04.png";
import icon05 from "@/assets/img/bigBanner/icons/05.png";
import icon06 from "@/assets/img/bigBanner/icons/06.png";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
export const bigBannerData = [
  {
    icon: icon01,
    title: "دکترلـــــــرن",
    subTitle: "مرکز آموزش دکترآباد",
    image: person01,
    description:
      "بازارچه دوره‌های آموزشی علوم‌پزشکی داخلی و خارجی از بهترین ارائه دهندگان",
    primaryButtonLink: baseUrls.learn,
    secondaryButtonLink: "https://doctorabad.com/mag/doctorlearn/",
    primaryColor: "#ee2e53",
    secondaryColor: "#ab201a",
    id: "drlearn",
  },
  {
    icon: icon02,
    title: "دکترمارکت",
    subTitle: "مرکز خرید دکترآباد",
    image: person02,
    description:
      "بازارچه محصولات تخصصی علوم‌پزشکی؛ از بهترین ناشران و تولیدکنندگان",
    primaryButtonLink: baseUrls.market,
    secondaryButtonLink: "https://doctorabad.com/mag/doctormarket/",
    primaryColor: "#f54f1a",
    secondaryColor: "#fb4a14",
    id: "drmarket",
  },
  {
    icon: icon03,
    title: "ابزارهای‌من",
    subTitle: "مرکز ابــــزار دکترآباد",
    image: person03,
    description:
      "بانک اطلاعات بیماری‌ها و داروها، دیتابیس ها و ماشین‌حساب‌های علوم‌پزشکی",
    primaryButtonLink: baseUrls.tools,
    secondaryButtonLink: "https://doctorabad.com/mag/doctortools/",
    primaryColor: "#33cc33",
    secondaryColor: "#1f5c00",
    id: "drtool",
  },
  {
    icon: icon04,
    title: "دکتردانـــلود",
    subTitle: "مرکز محتوای دکترآباد",
    image: person04,
    description:
      "بازارچه فایل‌های الکترونیک علوم‌پزشکی؛کتاب‌های رفرنس، مجلات علمی و ارائه دروس",
    primaryButtonLink: routePath.appDownload,
    secondaryButtonLink: baseUrls.download,
    primaryColor: "#006797",
    secondaryColor: "#0050CD",
    id: "drdownload",
  },
  {
    icon: icon05,
    title: "دکتراگــــزم",
    subTitle: "مرکز آزمون دکترآباد",
    image: person05,
    description:
      "بانک جامع سوالات علوم‌پزشکی با فیلتر پیشرفته،آزمون ساز، تک‌آزمون‌ها و صدور کارنامه تحلیلی",
    primaryButtonLink: baseUrls.exam,
    secondaryButtonLink: "https://doctorabad.com/mag/doctorexam/",
    primaryColor: "#7030a0",
    secondaryColor: "#481F64",
    id: "drexam",
  },
  {
    icon: icon06,
    title: "دکترپـــلاس",
    subTitle: "مرکز فارغ التحصیلان",
    image: person06,
    description:
      "نسخه‌نویسی الکترونیک بیمه‌های پایه بستر مشاوره آنلاین و خرید بیمه مسئولیت",
    primaryButtonLink: routePath.appDownload,
    secondaryButtonLink: "https://doctorabad.com/mag/doctorplus/",
    primaryColor: "#a6a6a6",
    secondaryColor: "#a6a6a6",
    id: "drplus",
  },
];

