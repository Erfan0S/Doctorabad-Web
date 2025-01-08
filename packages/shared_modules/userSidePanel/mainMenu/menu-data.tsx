import { SidePanelPage } from "../types/sidePanel";
import coinIcon from "../../assets/img/coin.png";
import { logOut } from "../utils/authUtils";
import ChatIcon from "../../assets/svg/chat";
import ExitIcon from "../../assets/svg/exit";
import OrdersIcon from "../../assets/svg/orders";
import MassagesIcon from "../../assets/svg/massages";
import PlansIcon from "../../assets/svg/plans";
import FriendsIcon from "../../assets/svg/friends";
import HeartIcon from "../../assets/svg/heart";
import ProfileIcon from "../../assets/svg/profile";
import { FC } from "react";
import Image from "next/image";

interface SidePanelMenuItem {
  id: number;
  title: string;
  Icon: FC;
  href?: SidePanelPage;
  action?: () => Promise<void>;
}

export const sidePanelMenuData: SidePanelMenuItem[] = [
  {
    id: 1,
    title: "دکترکلاب",
    Icon: () => <Image src={coinIcon} alt="دکترکلاب" />,
    href: SidePanelPage.CLUB,
  },
  {
    id: 2,
    title: "پشتیبانی",
    Icon: ChatIcon,
    href: SidePanelPage.SUPPORT,
  },
  {
    id: 3,
    title: "خروج از کلبه",
    Icon: ExitIcon,
    action: logOut,
  },
  {
    id: 4,
    title: "علاقه‌مندی‌های‌من",
    Icon: HeartIcon,
    href: SidePanelPage.FAVORITES,
  },
  {
    id: 5,
    title: "سفارش‌های‌من",
    Icon: OrdersIcon,
    href: SidePanelPage.ORDERS,
  },
  {
    id: 6,
    title: "پیام‌های‌من",
    Icon: MassagesIcon,
    href: SidePanelPage.MESSAGES,
  },
  {
    id: 7,
    title: "طرح‌های‌من",
    Icon: PlansIcon,
    href: SidePanelPage.MAIN,
  },
  {
    id: 8,
    title: "رفقای‌من",
    Icon: FriendsIcon,
    href: SidePanelPage.FRIENDS,
  },
  {
    id: 9,
    title: "اطلاعات‌من",
    Icon: ProfileIcon,
    href: SidePanelPage.PROFILE,
  },
];
