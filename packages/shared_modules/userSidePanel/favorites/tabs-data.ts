import { SidePanelFavoriteTab } from "../types/sidePanel";

export const favoriteTabsData = [
  {
    id: 1,
    title: "مرکز‌خرید",
    content: SidePanelFavoriteTab.LEARNING_CENTER,
    active: true,
    disabled: false,
  },
  {
    id: 2,
    title: "مرکز‌آموزش",
    content: SidePanelFavoriteTab.SHOPPING_CENTER,
    active: false,
    disabled: true,
  },
  {
    id: 3,
    title: "مرکز‌محتوا",
    content: SidePanelFavoriteTab.CONTENT_CENTER,
    active: false,
    disabled: true,
  },
  {
    id: 4,
    title: "مرکز‌آزمون",
    content: SidePanelFavoriteTab.EXAM_CENTER,
    active: false,
    disabled: true,
  },
];
