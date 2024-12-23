import { SidePanelList, SidePanelPage } from '@/types/sidePanel';
import SidePanelMainMenu from './mainMenu';
import SidePanelSupport from './support';
import SidePanelClub from './club';
import SidePanelFavorites from './favorites';
import SidePanelOrders from './orders';
import SidePanelMessages from './messages';
import SidePanelFriends from './friends';
import SidePanelProfile from './profile';

export const sidePanelPageList: SidePanelList = {
  [SidePanelPage.MAIN]: SidePanelMainMenu,
  [SidePanelPage.CLUB]: SidePanelClub,
  [SidePanelPage.SUPPORT]: SidePanelSupport,
  [SidePanelPage.FAVORITES]: SidePanelFavorites,
  [SidePanelPage.ORDERS]: SidePanelOrders,
  [SidePanelPage.MESSAGES]: SidePanelMessages,
  [SidePanelPage.FRIENDS]: SidePanelFriends,
  [SidePanelPage.PROFILE]: SidePanelProfile,
};
