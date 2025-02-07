import CourseList from "@/components/common/CourseList";
import PageHeader from "@/components/Header/PageHeader";
import Filters from "@/components/Search/Filters";
import React from "react";

const courses = [
  {
    id: 476,
    title: "دوره هفته آخر روان پزشکی",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202401301007091692.jpg",
    price_main: 159000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 435,
    title: "دوره روانپزشکی نوآوران دانش",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202309101443305018.jpg",
    price_main: 700000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 262,
    title: "دوره ضروریات دستیاری روان‌پزشکی پارسیان دانش",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-20211129183140.jpg",
    price_main: 189000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 237,
    title: "دوره مرورسریع روان‌پزشکی پارسیان دانش 1399",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-20211104192423.jpg",
    price_main: 114000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 465,
    title: "دوره زبان تخصصی نورولوژی و روانپزشکی هابمد",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202401021954026570.png",
    price_main: 359000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 130,
    title: "دوره دوبله فارسی روان پزشکی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/0mmEwbhLMB4bSHnxN8D2EK8LY8FbRnDC6rCqkBm6.png",
    price_main: 257000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 114,
    title: "دوره روان پزشکی لکچریو 2019",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/NSnsD3bRGYO6AdqPbt23zLJciUQ9FdFMf6upHEyc.jpeg",
    price_main: 41000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 309,
    title: "دوره روانپزشکی کاپلان",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202207102056018157.jpg",
    price_main: 33000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 224,
    title: "دوره روان پزشکی Boards and Beyond",
    pic_url: null,
    price_main: 33000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 32,
    title: "دوره استدلال بالینی روانپزشکی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/HX3hFtalbWIySM5K5VBqtCPvI2uLsxyaoGVg7oDA.jpeg",
    price_main: 21000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 334,
    title: "دوره آناتومی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202207101841033865.jpg",
    price_main: 97000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 36,
    title: "دوره استدلال بالینی طب اورژانس اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/aN6PJzt2iRtBijJdjxNihi58tACTGDFuklbNxmlW.jpeg",
    price_main: 27000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 24,
    title: "دوره استدلال بالینی قلب اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/MRLkToR2tSKCZuvT0TbsjAYbIn2bGqwmVZvYxLMK.jpeg",
    price_main: 21000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 1,
    title: "دوره قلب و عروق اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/S6e46y7Py6gBmU4afjjYl2nq6uTYxAvdl1KgSVX2.jpeg",
    price_main: 67000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 31,
    title: "دوره استدلال بالینی نورولوژی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/0yPdRuLM6GmlyzLekWI4F9qJp2GzwELZB8hPy02d.jpeg",
    price_main: 29000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 13,
    title: "دوره نورولوژی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/hFnZjJVn2VFapYg215OxJWEdBWTgWlvqIQhY9YxU.jpeg",
    price_main: 53000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 35,
    title: "دوره استدلال بالینی جراحی اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/kJ2ab4EzLl3WiZWtKHdXZR7tqjGAv6dIqabCCTu5.jpeg",
    price_main: 21000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 30,
    title: "دوره استدلال بالینی کلیه اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/LiZjXp0a0JNkfFvKnGNzxqgI3EPwruXoBz5BOK4M.jpeg",
    price_main: 29000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 16,
    title: "دوره کلیه اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/jWHrMt242aOODSh87X4uS1Pb7YGx8GgJsTgXyDcR.jpeg",
    price_main: 47000,
    price_off: null,
    price_amazing: null,
  },
  {
    id: 29,
    title: "دوره استدلال بالینی گوارش اسموزیس",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/yB6JXgURJmDmj3KaPO5lFiiEDpSub34ju4In6etY.jpeg",
    price_main: 37000,
    price_off: null,
    price_amazing: null,
  },
];

const SearchPage = () => {
  return (
    <div>
      <PageHeader title="فیلتر کردن" children={<Filters />} />
      <div className="container">
        <CourseList courses={courses} />
      </div>
    </div>
  );
};

export default SearchPage;
