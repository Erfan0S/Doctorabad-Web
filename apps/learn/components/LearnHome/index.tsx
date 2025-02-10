import TabsController from "@/components/common/TabsController";
import ProductSlider from "@/components/LearnHome/productSlider";
import SearchBar from "@/components/Search/SearchBar";
import React from "react";
import { TabsData } from "../Header/HomeHeader/tabs-data";
import styles from "./LearnHome.module.scss";
import MainSlider from "./slider";
import { sliderData } from "./slider/slider-data";
import CategoriesList from "../common/CategoriesList";

const data = [
  {
    id: 539,
    title: "تست ساخت دوره با قیمت amazing در tree",
    pic_url: null,
    price_main: 88866,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 538,
    title: "تست ساخت دوره جدید بدون amazing از tree",
    pic_url: null,
    price_main: 6666,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 532,
    title: "دوره آمادگی طرح نورولوژی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202412011552149415.PNG",
    price_main: 219000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 531,
    title: "دوره آمادگی طرح روان‌پزشکی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202412011552538543.png",
    price_main: 350000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 530,
    title: "اجوسکریپشن - نسخه‌های گوارشی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202412181035082710.jpg",
    price_main: 180000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 529,
    title: "اجوسکریپشن - نسخه‌های کلیه و مجاری ادراری",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202412181035261211.jpg",
    price_main: 180000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 528,
    title: "اجوسکریپشن - نسخه‌های مکمل",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202410121412519878.jpg",
    price_main: 245000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 527,
    title: "اجوسکریپشن - نسخه‌های تنفسی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202410121411464939.jpg",
    price_main: 180000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 526,
    title: "اجوسکریپشن - نسخه‌های غدد",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202411061728171696.jpg",
    price_main: 480000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 525,
    title: "اجوسکریپشن - نسخه‌های عفونی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202410121408047204.jpg",
    price_main: 180000,
    price_off: null,
    price_amazing: null,
  },
];

const categories = [
  {
    id: 535,
    title: "پیشنهاد ویژه‌",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202311261446034385.jpg",
  },
  {
    id: 534,
    title: "محبوب‌ترین‌‌ها",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202311261446412870.jpg",
  },
  {
    id: 552,
    title: "مهارت‌افزایی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202212101201225753.jpg",
  },
  {
    id: 1009,
    title: "آمادگی‌طرح",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202408150112487144.jpg",
  },
  {
    id: 616,
    title: "دوره‌های‌هفته‌آخر (ویژه‌پره‌اینترنی)",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202401201345083362.jpg",
  },
  {
    id: 1008,
    title: "دوره‌های‌قدم‌آخر (ویژه‌علوم‌پایه)",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202408150016565270.jpg",
  },
  {
    id: 1,
    title: "سمیولوژی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/Tk5b8kCn2PryKQJaLRvrbdFoci2ZYi7X0sQSzzPY.jpeg",
  },
  {
    id: 49,
    title: "کاردیولوژی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/3A1taxXkSifjGt6TaBbW9JPQvCXdFMBOAwGsMisV.jpeg",
  },
  {
    id: 5,
    title: "گوارش‌",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/mcpqahf9zfyGXbHma9YT3E2XlUjhq6kPVi8dulWv.jpeg",
  },
  {
    id: 6,
    title: "هماتولوژی و انکولوژی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202212101204509880.jpg",
  },
  {
    id: 123,
    title: "هماتولوژی و انکولوژی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202212101204509880.jpg",
  },
];

const MainPage = () => {
  return (
    <div className={styles.container}>
      <MainSlider banners={sliderData} swiperOptions={{ spaceBetween: -100 }} />
      <ProductSlider
        data={data}
        title="دوره‌های جدید"
        archiveLink="#"
        customSliderConfig={{ spaceBetween: -45 }}
      />
    </div>
  );
};

export default MainPage;
