import Aparat from '@/assets/svg/aparat';
import Facebook from '@/assets/svg/facebook';
import Instagram from '@/assets/svg/instagram';
import Telegram from '@/assets/svg/telegram';
import Tiktok from '@/assets/svg/tiktok';
import Twitter from '@/assets/svg/twitter';
import style from './Footer.module.scss';

export const footerSocialMedia = [
  {
    id: 1,
    href: 'https://www.tiktok.com/@doctorabad',
    name: 'TikTok',
    svg: <Tiktok width={20} height={20} />,
    className: style.tiktok,
  },
  {
    id: 2,
    href: 'https://twitter.com/DoctorAbadcom',
    name: 'Twitter',
    svg: <Twitter width={20} height={20} />,
    className: style.twitter,
  },
  {
    id: 3,
    href: 'https://www.facebook.com/DoctorAbadcom/',
    name: 'Facebook',
    svg: <Facebook width={20} height={20} />,
    className: style.facebook,
  },
  {
    id: 4,
    href: 'https://www.aparat.com/DoctorAbad',
    name: 'آپارات',
    svg: <Aparat width={20} height={20} />,
    className: style.aparat,
  },
  {
    id: 5,
    href: 'https://www.instagram.com/doctorabad/',
    name: 'Instagram',
    svg: <Instagram width={20} height={20} />,
    className: style.instagram,
  },
  {
    id: 6,
    href: 'https://t.me/DoctorAbad',
    name: 'Telegram',
    svg: <Telegram width={20} height={20} />,
    className: style.telegram,
  },
];
