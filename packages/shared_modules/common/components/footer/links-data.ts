import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

export const footerLinks = [
  {
    id: 1,
    action: () => modalActions.addModal(ModalTypes.REGISTER),
    title: "ورود/ثبت‌نام",
  },
  {
    id: 2,
    action: () => modalActions.addModal(ModalTypes.TRACKING),
    title: "رهگیری پستی",
  },
  {
    id: 3,
    href: "https://doctorabad.com/mag/support/",
    title: "تماس‌با‌ما",
  },
  {
    id: 4,
    href: "https://doctorabad.com/mag/about/",
    title: "درباره‌ما",
  },
  {
    id: 5,
    href: "https://doctorabad.com/mag/team/",
    title: "تیم‌ما",
  },
  {
    id: 6,
    href: "https://doctorabad.com/mag/invitation/",
    title: "همکاری‌باما",
  },
  {
    id: 7,
    href: "https://doctorabad.com/mag/privacy-policy/",
    title: "شرایطاستفاده",
  },
  {
    id: 8,
    href: "https://doctorabad.com/mag/bug/",
    title: "گزارش‌خطا",
  },
];
