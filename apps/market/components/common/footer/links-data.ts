import { modalActions } from "@repo/core";
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
    href: "#",
    title: "راهنما",
  },
  {
    id: 4,
    href: "#",
    title: "تماس‌با‌ما",
  },
  {
    id: 5,
    href: "#",
    title: "درباره‌ما",
  },
  {
    id: 6,
    href: "#",
    title: "همکاری‌باما",
  },
];
