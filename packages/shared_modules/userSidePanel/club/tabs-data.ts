import { SidePanelClubTab } from "../types/sidePanel";

export const clubTabsData = [
  {
    id: 1,
    title: "ماموریت‌های من",
    content: SidePanelClubTab.MISSIONS,
    active: true,
  },
  {
    id: 2,
    title: "پیشنهاد‌های من",
    content: SidePanelClubTab.SUGGESTIONS,
    active: false,
  },
  {
    id: 3,
    title: "رتبه‌من",
    content: SidePanelClubTab.RANK,
    active: false,
  },
  {
    id: 4,
    title: "تاریخچه‌من",
    content: SidePanelClubTab.HISTORY,
    active: false,
  },
];
