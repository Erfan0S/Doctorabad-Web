// data/toolsData.ts

export interface Tool {
  id: string; // شناسه یکتا (برای url و favorite)
  title: string;
  description: string;
  iconChar: string; // حرف انگلیسی بزرگ داخل باکس رنگی
  colorClass: string; // کلاس رنگی (green, yellow, orange, red)
  href: string;
}

export const ALL_TOOLS: Tool[] = [
  {
    id: "uptodate",
    title: "UpToDate",
    description:
      "بزرگترین بانک اطلاعات علوم پزشکی بر اساس داده‌های مبتنی بر شواهد",
    iconChar: "U",
    colorClass: "green-dark",
    href: "/uptodate",
  },
  {
    id: "apgar",
    title: "Apgar",
    description: "ارزیابی سلامت نوزاد در لحظات ابتدایی تولد",
    iconChar: "A",
    colorClass: "green-light",
    href: "/apgar",
  },
  {
    id: "alvarado",
    title: "Alvarado",
    description: "پیش‌بینی احتمال آپاندیسیت حاد",
    iconChar: "A",
    colorClass: "yellow",
    href: "/alvarado",
  },
  {
    id: "gfr",
    title: "GFR",
    description:
      "محاسبه نرخ فیلتراسیون گلومرول ها (Glomerular Filtration Rate)",
    iconChar: "G",
    colorClass: "orange-light",
    href: "/gfr",
  },
  {
    id: "map",
    title: "MAP",
    description: "فشار متوسط شریانی بر اساس فشار سیستولی و دیاستولی",
    iconChar: "M",
    colorClass: "orange-dark",
    href: "/map",
  },
  {
    id: "bmi",
    title: "BMI",
    description: "محاسبه شاخص توده بدن (Body Mass Index)",
    iconChar: "B",
    colorClass: "red",
    href: "/bmi",
  },

  // --- ابزارهای جدید از تصاویر ---
  {
    id: "calcium-correction",
    title: "Calcium Correction",
    description: "تصحیح غلظت کلسیم با توجه به میزان آلبومین",
    iconChar: "C",
    colorClass: "red", // قرمز تیره
    href: "/calcium-correction",
  },
  {
    id: "gcs",
    title: "GCS",
    description:
      "Glasgow Coma Scale\nمقیاس کمای گلاسکو برای تعیین میزان هوشیاری",
    iconChar: "G",
    colorClass: "red-dark", // قرمز خیلی تیره/قهوه‌ای
    href: "/gcs",
  },
  {
    id: "pregnancy",
    title: "Pregnancy",
    description: "محاسبه سن بارداری و زمان تقریبی زایمان",
    iconChar: "P",
    colorClass: "pink", // صورتی
    href: "/pregnancy",
  },
  {
    id: "fena",
    title: "FENa",
    description: "کسر دفعی سدیم برای تشخیص نوع نارسایی کلیوی",
    iconChar: "F",
    colorClass: "purple", // بنفش
    href: "/fena",
  },
  {
    id: "has-bled",
    title: "HAS-BLED Score",
    description:
      "تخمین میزان خونریزی در بیماران تحت درمان با درمان‌های ضد انعقاد",
    iconChar: "H",
    colorClass: "violet", // بنفش روشن/نیلی
    href: "/has-bled-score",
  },
  {
    id: "cha2ds2-vasc",
    title: "CHA2DS2-VASC",
    description: "تخمین ریسک سکته مغزی در بیماران قلبی",
    iconChar: "C",
    colorClass: "blue-dark", // سرمه‌ای
    href: "/cha2ds2-vasc",
  },
  {
    id: "chads2",
    title: "CHADS2",
    description: "تخمین ریسک سکته مغزی در بیماران قلبی",
    iconChar: "C",
    colorClass: "blue", // آبی
    href: "/chads2",
  },
  {
    id: "maintenance-fluids",
    title: "Maintenance Fluids",
    description: "میزان مایع نگهداره برای سرم درمانی",
    iconChar: "M",
    colorClass: "cyan", // فیروزه‌ای/سیان
    href: "/maintenance-fluids",
  },
  {
    id: "abcd2",
    title: "ABCD2",
    description: "ارزیابی خطر تکرار ایسکمی و سکته مغزی",
    iconChar: "A",
    colorClass: "teal", // سبز آبی
    href: "/abcd2",
  },
  {
    id: "wells-pte",
    title: "Wells PTE",
    description: "ارزیابی خطر ترومبوآمبولی ریوی",
    iconChar: "W",
    colorClass: "green-mid", // سبز متوسط
    href: "/wells-pte",
  },
  {
    id: "wells-dvt",
    title: "Wells DVT",
    description: "ارزیابی خطر ترومبوآمبولی وریدی",
    iconChar: "W",
    colorClass: "lime", // مغز پسته‌ای / زرد-سبز
    href: "/wells-dvt",
  },
];
