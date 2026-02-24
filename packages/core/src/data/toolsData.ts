// Shared tools data for base and tools apps

export interface Tool {
  id: string;
  title: string;
  description: string;
  iconChar: string;
  colorClass: string;
  href: string;
}

export const ALL_TOOLS: Tool[] = [
  { id: "uptodate", title: "UpToDate", description: "بزرگترین بانک اطلاعات علوم پزشکی بر اساس داده‌های مبتنی بر شواهد", iconChar: "U", colorClass: "green-dark", href: "/uptodate" },
  { id: "apgar", title: "Apgar", description: "ارزیابی سلامت نوزاد در لحظات ابتدایی تولد", iconChar: "A", colorClass: "green-light", href: "/apgar" },
  { id: "alvarado", title: "Alvarado", description: "پیش‌بینی احتمال آپاندیسیت حاد", iconChar: "A", colorClass: "yellow", href: "/alvarado" },
  { id: "gfr", title: "GFR", description: "محاسبه نرخ فیلتراسیون گلومرول ها", iconChar: "G", colorClass: "orange-light", href: "/gfr" },
  { id: "map", title: "MAP", description: "فشار متوسط شریانی بر اساس فشار سیستولی و دیاستولی", iconChar: "M", colorClass: "orange-dark", href: "/map" },
  { id: "bmi", title: "BMI", description: "محاسبه شاخص توده بدن", iconChar: "B", colorClass: "red", href: "/bmi" },
  { id: "calcium_correction", title: "Calcium Correction", description: "تصحیح غلظت کلسیم با توجه به میزان آلبومین", iconChar: "C", colorClass: "red", href: "/calcium_correction" },
  { id: "gcs", title: "GCS", description: "مقیاس کمای گلاسکو برای تعیین میزان هوشیاری", iconChar: "G", colorClass: "red-dark", href: "/gcs" },
  { id: "pregnancy", title: "Pregnancy", description: "محاسبه سن بارداری و زمان تقریبی زایمان", iconChar: "P", colorClass: "pink", href: "/pregnancy" },
  { id: "fena", title: "FENa", description: "کسر دفعی سدیم برای تشخیص نوع نارسایی کلیوی", iconChar: "F", colorClass: "purple", href: "/fena" },
  { id: "has_bled", title: "HAS-BLED Score", description: "تخمین میزان خونریزی در بیماران تحت درمان با درمان‌های ضد انعقاد", iconChar: "H", colorClass: "violet", href: "/has_bled_score" },
  { id: "cha2ds2_vasc", title: "CHA2DS2-VASC", description: "تخمین ریسک سکته مغزی در بیماران قلبی", iconChar: "C", colorClass: "blue-dark", href: "/cha2ds2_vasc" },
  { id: "chads2", title: "CHADS2", description: "تخمین ریسک سکته مغزی در بیماران قلبی", iconChar: "C", colorClass: "blue", href: "/chads2" },
  { id: "maintenance_fluids", title: "Maintenance Fluids", description: "میزان مایع نگهداره برای سرم درمانی", iconChar: "M", colorClass: "cyan", href: "/maintenance_fluids" },
  { id: "abcd2", title: "ABCD2", description: "ارزیابی خطر تکرار ایسکمی و سکته مغزی", iconChar: "A", colorClass: "teal", href: "/abcd2" },
  { id: "wells_pte", title: "Wells PTE", description: "ارزیابی خطر ترومبوآمبولی ریوی", iconChar: "W", colorClass: "green-mid", href: "/wells_pte" },
  { id: "wells_dvt", title: "Wells DVT", description: "ارزیابی خطر ترومبوآمبولی وریدی", iconChar: "W", colorClass: "lime", href: "/wells_dvt" },
];
