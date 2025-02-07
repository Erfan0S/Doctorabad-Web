import React from "react";
import TabsController from "@/components/common/TabsController";
import { CourseTabsData } from "./tabs-data";
import { CourseDataType, CourseListItemType } from "@/types/courses";
import testImage from "@/assets/img/club.png";
import CourseComments from "./comments";
import CourseContent from "./lessons";
import CourseList from "@/components/common/CourseList";

const coursesListData: CourseListItemType[] = [
  {
    id: 1,
    title: "دوره آموزش کاربردی صلاحیت بالینی",
    price_main: 1429000,
    price_amazing: null,
    price_off: null,
    pic_url: testImage.toString(),
  },
  {
    id: 2,
    title: "دوره آموزش کاربردی صلاحیت بالینی",
    price_main: 1429000,
    price_amazing: null,
    price_off: null,
    pic_url: testImage.toString(),
  },
  {
    id: 3,
    title: "دوره آموزش کاربردی صلاحیت بالینی",
    price_main: 1429000,
    price_amazing: null,
    price_off: null,
    pic_url: testImage.toString(),
  },
  {
    id: 4,
    title: "دوره آموزش کاربردی صلاحیت بالینی",
    price_main: 1429000,
    price_amazing: null,
    price_off: null,
    pic_url: testImage.toString(),
  },
];

const CourseData: CourseDataType = {
  id: 51,
  title: "دوره دوبله فارسی اصول شرح‌حال، معاینات و آسکی باربارابیتز 2022",
  description:
    "<p>موضوع دوره: سمیولوژی (فیلم‌های رسمی کتاب باربارابیتز آپدیت 2022)</p><p>✅ پیش‌نیاز دوره: ندارد</p><p>✅ زبان دوره: فارسی</p><p>✅ مروری‌ بر آناتومی‌ و فیزیولوژی‌</p><p>✅ بررسی‌ شکایت‌های (CC) شایع‌ بالینی‌ و سمیولوژی</p><p>✅ نمایش‌ و توضیح‌ تکنیک‌های‌ معاینه‌ فیزیکی‌ به‌ صورت‌ کاملا‌ بصری</p><p>✅ جداول‌ تشخیص‌ و مقایسه‌ اختلالات‌ بیماری‌های‌ شایع</p><p>✅ بررسی‌ و ردتشخیص‌های‌ افتراقی‌ مطرح</p><p>✅ نمونه‌های‌ شایع‌ و‌ کاربردی‌ اخذ کامل‌ شرح‌حال‌ و معاینه‌ بیماران</p><p>✅‌ آزمون‌های‌بالینی‌ساختاریافته‌عینی (OSCE)</p><p>✅‌ بازیگران هر فیلم با تصاویر موجود در کتاب یکسان هستند.</p>",
  provider: {
    id: 23,
    name: "دکترآباد",
    pic_url:
      "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202312151758444633.jpg",
  },
  language: 1,
  categories: [
    {
      id: 1,
      title: "سمیولوژی",
    },
    {
      id: 534,
      title: "محبوب‌ترین‌‌ها",
    },
    {
      id: 982,
      title: "جعبه 2",
    },
  ],
  fields: [],
  grades: [],
  course_duration: 51367,
  student_count: 1800,
  user_has_access: false,
  price_main: 393000,
  price_off: null,
  price_amazing: null,
  amazing_end_date: null,
  is_sellable: true,
  coins: 393,
  user_favorite: 0,
  course_preview:
    "https://drabad.arvanvod.ir/QPrzrm4xZm/RrX879PBbN/origin_xvWTJtckh0czQ51Hpqp4aTkigrsh7ULf4as1kbOD.mp4",
  course_pic:
    "https://s3.ir-thr-at1.arvanstorage.ir/drabad-education-pics/file-202211231404419572.jpg",
  sections: [
    {
      id: 79,
      title: "معاینات و آسکی",
      chapters: [
        {
          id: 186,
          title: "معاینات",
          lessons: [
            {
              id: 1582,
              title: "ارزیابی سر تا پا: بزرگسالان",
              duration: 1607,
            },
            {
              id: 1583,
              title: "ارزیابی سر تا پا: نوزادان",
              duration: 2384,
            },
            {
              id: 1584,
              title: "ارزیابی سر تا پا: کودکان",
              duration: 1921,
            },
            {
              id: 1585,
              title: "بررسی عمومی و علائم حیاتی",
              duration: 1557,
            },
            {
              id: 1586,
              title: "پوست",
              duration: 834,
            },
            {
              id: 1587,
              title: "سر ، چشم و گوش",
              duration: 1630,
            },
            {
              id: 1588,
              title: "بینی ، دهان و گردن",
              duration: 1119,
            },
            {
              id: 1589,
              title: "توراکس و ریه ها",
              duration: 1122,
            },
            {
              id: 1590,
              title: "سیستم قلبی عروقی",
              duration: 1787,
            },
            {
              id: 1591,
              title: "سیستم عروقی محیطی",
              duration: 1220,
            },
            {
              id: 1592,
              title: "سینه و زیربغل",
              duration: 964,
            },
            {
              id: 1593,
              title: "شکم",
              duration: 1015,
            },
            {
              id: 1594,
              title: "دستگاه تناسلی مردان،رکتوم،مقعد و پروستات",
              duration: 1203,
            },
            {
              id: 1595,
              title: "دستگاه تناسلی زنان ، مقعد و رکتوم",
              duration: 1249,
            },
            {
              id: 1596,
              title: "سیستم اسکلتی عضلانی",
              duration: 2054,
            },
            {
              id: 1597,
              title: "سیستم عصبی: اعصاب کرانیال و سیستم حرکتی",
              duration: 1435,
            },
            {
              id: 1598,
              title: "سیستم عصبی: سیستم حسی و رفلکس ها",
              duration: 1040,
            },
            {
              id: 1661,
              title: "ارزیابی سر تا پا : افراد مسن",
              duration: 1554,
            },
          ],
        },
        {
          id: 187,
          title: "آسکی",
          lessons: [
            {
              id: 1599,
              title: "آسکی 1: درد قفسه سینه",
              duration: 890,
            },
            {
              id: 1600,
              title: "آسکی2: درد شکم",
              duration: 791,
            },
            {
              id: 1601,
              title: "آسکی3: گلو درد",
              duration: 877,
            },
            {
              id: 1602,
              title: "آسکی4: درد زانو",
              duration: 1077,
            },
            {
              id: 1603,
              title: "آسکی5: سرفه",
              duration: 1000,
            },
            {
              id: 1604,
              title: "آسکی6: استفراغ",
              duration: 1422,
            },
            {
              id: 1605,
              title: "آسکی7: آمنوره",
              duration: 1246,
            },
            {
              id: 1606,
              title: "آسکی8: سقوط",
              duration: 1200,
            },
            {
              id: 1607,
              title: "آسکی9: کمردرد",
              duration: 1372,
            },
            {
              id: 1608,
              title: "آسکی10: تنگی نفس",
              duration: 1525,
            },
            {
              id: 1609,
              title: "آسکی11: درد شانه",
              duration: 1490,
            },
            {
              id: 1610,
              title: "آسکی12: آسم کودک و نوجوان",
              duration: 1416,
            },
            {
              id: 1611,
              title: "آسکی13: سردرد",
              duration: 1571,
            },
            {
              id: 1612,
              title: "آسکی14: چاقی کودک و نوجوان",
              duration: 1738,
            },
            {
              id: 1613,
              title: "آسکی15: از دست دادن حافظه",
              duration: 1558,
            },
          ],
        },
        {
          id: 2215,
          title: "مهارت‌های ارتباطی و اجتماعی",
          lessons: [
            {
              id: 13648,
              title: "تکنیک: پاسخ‌های همدلانه",
              duration: 229,
            },
            {
              id: 13649,
              title: "ارتباط: نوجوانان",
              duration: 193,
            },
            {
              id: 13650,
              title: "کسب رضایت آگاهانه",
              duration: 244,
            },
            {
              id: 13651,
              title: "همکاری با مترجم‌های پزشکی",
              duration: 421,
            },
            {
              id: 14985,
              title: "مصاحبه انگیزشی",
              duration: 486,
            },
            {
              id: 14986,
              title: "پاسخ به سرنخ های عاطفی",
              duration: 205,
            },
            {
              id: 14987,
              title: "افشای اخبار جدی",
              duration: 253,
            },
            {
              id: 14988,
              title: "بحث در مورد دستورالعمل های پیشرفته",
              duration: 234,
            },
            {
              id: 14990,
              title: "مطرح کردن موضوعات حساس",
              duration: 201,
            },
            {
              id: 14991,
              title: "ارتباط با بیماران دارای معلولیت",
              duration: 275,
            },
            {
              id: 14992,
              title: "ارتباط با بیماران دارای معلولیت",
              duration: 275,
            },
            {
              id: 14993,
              title: "ارتباط با بیماران دارای معلولیت",
              duration: 275,
            },
          ],
        },
      ],
    },
    {
      id: 997,
      title: ".",
      chapters: [
        {
          id: 2655,
          title: ".",
          lessons: [
            {
              id: 16718,
              title: "تدریس ویروس شناسی - بخش اول",
              duration: 1926,
            },
            {
              id: 16719,
              title: "تدریس ویروس شناسی - بخش دوم",
              duration: 2564,
            },
            {
              id: 16720,
              title: "تدریس ویروس شناسی - بخش سوم",
              duration: 2922,
            },
            {
              id: 16721,
              title: "تدریس ویروس شناسی - بخش چهارم",
              duration: 847,
            },
            {
              id: 16722,
              title: "بررسی سوالات ویروس شناسی",
              duration: 822,
            },
          ],
        },
      ],
    },
  ],
};

const CourseTabs = () => {
  return <div></div>;
};

export default CourseTabs;
