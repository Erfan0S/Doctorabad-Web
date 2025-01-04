import { SidePanelPage } from '@/types/sidePanel';
import coinIcon from '@/assets/img/coin.png';
import supportIcon from '@/assets/img/chat.png';
import exitIcon from '@/assets/img/exit.png';
import favoriteIcon from '@/assets/img/favorite-fill.png';
import ordersIcon from '@/assets/img/orders.png';
import messagesIcon from '@/assets/img/messages.png';
import plansIcon from '@/assets/img/plan.png';
import friendsIcon from '@/assets/img/friends.png';
import profileIcon from '@/assets/img/profile.png';
import { logOut } from '@/utils/authUtils';
import ChatIcon from '@/assets/svg/newIcons/chat';
import ExitIcon from '@/assets/svg/newIcons/exit';
import OrdersIcon from '@/assets/svg/newIcons/orders';
import MassagesIcon from '@/assets/svg/newIcons/massages';
import PlansIcon from '@/assets/svg/newIcons/plans';
import FriendsIcon from '@/assets/svg/newIcons/friends';
import HeartIcon from '@/assets/svg/newIcons/heart';
import ProfileIcon from '@/assets/svg/newIcons/profile';
import { FC } from 'react';
import Image from 'next/image';

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
    title: 'دکترکلاب',
    Icon: () => <Image src={coinIcon} alt="دکترکلاب" />,
    href: SidePanelPage.CLUB,
  },
  {
    id: 2,
    title: 'پشتیبانی',
    Icon: ChatIcon,
    href: SidePanelPage.SUPPORT,
  },
  {
    id: 3,
    title: 'خروج از کلبه',
    Icon: ExitIcon,
    action: logOut,
  },
  {
    id: 4,
    title: 'علاقه‌مندی‌های‌من',
    Icon: HeartIcon,
    href: SidePanelPage.FAVORITES,
  },
  {
    id: 5,
    title: 'سفارش‌های‌من',
    Icon: OrdersIcon,
    href: SidePanelPage.ORDERS,
  },
  {
    id: 6,
    title: 'پیام‌های‌من',
    Icon: MassagesIcon,
    href: SidePanelPage.MESSAGES,
  },
  {
    id: 7,
    title: 'طرح‌های‌من',
    Icon: PlansIcon,
    href: SidePanelPage.MAIN,
  },
  {
    id: 8,
    title: 'رفقای‌من',
    Icon: FriendsIcon,
    href: SidePanelPage.FRIENDS,
  },
  {
    id: 9,
    title: 'اطلاعات‌من',
    Icon: ProfileIcon,
    href: SidePanelPage.PROFILE,
  },
];
