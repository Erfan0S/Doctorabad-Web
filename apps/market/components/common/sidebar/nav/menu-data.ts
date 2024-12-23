import doctorLearn from '@/assets/img/doctor-learn.png';
import doctorMarket from '@/assets/img/doctor-market.png';
import doctorTools from '@/assets/img/doctor-tools.png';
import doctorDownload from '@/assets/img/doctor-download.png';
import doctorExam from '@/assets/img/doctor-exam.png';
import menuLogo from '@/assets/img/logo-without-text.png';
import { routePath } from '@/constants/routePath';

export const mobileMenuLogoSchema = {
  id: 0,
  title: 'دکترآباد',
  subTitle: 'دکترآباد',
  href: '/',
  image: menuLogo,
  color: 'green',
  disabled: false,
  mobileTitle: 'دکترآباد',
};

export const sidebarMenuData = [
  {
    id: 1,
    title: 'دکتـــــــــــــــرلرن',
    subTitle: 'مرکزآموزش‌دکترآباد',
    href: 'https://doctorabad.com/app',
    image: doctorLearn,
    color: 'red',
    disabled: true,
    mobileTitle: '',
  },
  {
    id: 2,
    title: 'دکتــــــرمارکت',
    subTitle: 'مرکزخرید‌دکترآباد',
    href: routePath.marketBasePath,
    image: doctorMarket,
    color: 'orange',
    disabled: true,
    mobileTitle: 'مرکزخرید',
  },
  {
    id: 3,
    title: 'دکتـــــــــرتولز',
    subTitle: 'مرکزابزاردکترآباد',
    href: 'https://doctorabad.com/app',
    image: doctorTools,
    color: 'green',
    disabled: false,
    mobileTitle: '',
  },
  {
    id: 4,
    title: 'دکتـــــــــــردانلود',
    subTitle: 'مرکزمحتوای‌دکترآباد',
    href: 'https://doctorabad.com/app',
    image: doctorDownload,
    color: 'blue',
    disabled: true,
    mobileTitle: '',
  },
  {
    id: 5,
    title: 'دکتـــــــــــراگزم',
    subTitle: 'مرکزآزمون‌دکترآباد',
    href: 'https://doctorabad.com/app',
    image: doctorExam,
    color: 'purple',
    disabled: true,
    mobileTitle: '',
  },
];
