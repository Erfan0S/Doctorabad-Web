import {Dispatch, SetStateAction} from "react";

export enum SidePanelPage {
  MAIN = "main",
  CLUB = "club",
  SUPPORT = "support",
  FAVORITES = "favorites",
  ORDERS = "orders",
  MESSAGES = "messages",
  FRIENDS = "friends",
  PROFILE = "profile",
  DISCOUNTS = "discounts",
  PREV_CARTS = "prevCarts",
}

export enum SidePanelClubTab {
  MISSIONS = "missions",
  SUGGESTIONS = "suggestions",
  RANK = "rank",
  HISTORY = "history",
}

export enum SidePanelFavoriteTab {
  LEARNING_CENTER = "learningCenter",
  SHOPPING_CENTER = "shoppingCenter",
  DOWNLOAD_CENTER = "downloadCenter",
  EXAM_CENTER = "examCenter",
}

export enum DiscountBadge {
  GREEN = "GREEN",
  BRONZE = "BRONZE",
  SILVER = "SILVER",
}

export interface SidePanelPageProps {
  setPage: Dispatch<SetStateAction<SidePanelPage>>;
  data?: Record<string, any>;
}

export type SidePanelList = {
  [key in SidePanelPage]: React.FC<SidePanelPageProps>;
};
