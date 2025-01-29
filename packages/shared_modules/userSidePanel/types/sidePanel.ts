import { Dispatch, SetStateAction } from 'react';

export enum SidePanelPage {
  MAIN = 'main',
  CLUB = 'club',
  SUPPORT = 'support',
  FAVORITES = 'favorites',
  ORDERS = 'orders',
  MESSAGES = 'messages',
  FRIENDS = 'friends',
  PROFILE = 'profile',
}

export enum SidePanelClubTab {
  DISCOUNTS = 'discounts',
  HISTORY = 'history',
}

export enum SidePanelFavoriteTab {
  LEARNING_CENTER = 'learningCenter',
  SHOPPING_CENTER = 'shoppingCenter',
  CONTENT_CENTER = 'contentCenter',
  EXAM_CENTER = 'examCenter',
}

export enum DiscountBadge {
  GREEN = 'GREEN',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
}

export interface SidePanelPageProps {
  setPage: Dispatch<SetStateAction<SidePanelPage>>;
}

export type SidePanelList = {
  [key in SidePanelPage]: React.FC<SidePanelPageProps>;
};
