import { SidePanelList, SidePanelPage } from "@repo/core/types/sidePanel";
import SidePanelMainMenu from "./mainMenu";
import SidePanelSupport from "./support";
import SidePanelClub from "./club";
import SidePanelFavorites from "./favorites";
import SidePanelOrders from "./orders";
import SidePanelMessages from "./messages";
import SidePanelFriends from "./friends";
import SidePanelProfile from "./profile";
import { SidePanelDiscounts } from "./dicounts";
import PrevCarts from "./orders/carts";

export const sidePanelPageList: SidePanelList = {
  [SidePanelPage.MAIN]: SidePanelMainMenu,
  [SidePanelPage.CLUB]: SidePanelClub,
  [SidePanelPage.SUPPORT]: SidePanelSupport,
  [SidePanelPage.FAVORITES]: SidePanelFavorites,
  [SidePanelPage.ORDERS]: SidePanelOrders,
  [SidePanelPage.PREV_CARTS]: PrevCarts,
  [SidePanelPage.MESSAGES]: SidePanelMessages,
  [SidePanelPage.FRIENDS]: SidePanelFriends,
  [SidePanelPage.PROFILE]: SidePanelProfile,
  [SidePanelPage.DISCOUNTS]: SidePanelDiscounts,
};
