export interface AvatarFile {
  id: number;
  name: string;
  info: {
    path: string;
    bucket: string;
  };
}

export interface ResponseType<D = any> {
  status: number;
  data: D;
}

export interface PaginatedResponse<T> {
  data: T;
  total: number;
}

export type PaginatedRequest<T = {}> = T & { limit: string; page: string };

export type NextPageProps<P = {}> = {
  params: P;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type SelectionItem = {
  id: number;
  title: string;
};

export enum MultimediaType {
  VIDEO = "video",
  IMAGE = "image",
}

// duplicated
export interface UserClubInfo {
  user_coin: number;
  club_state_id: number;
  club_state_title: string;
  club_state_pic_url: string;
}

// duplicated
export enum SidePanelPage {
  MAIN = "main",
  CLUB = "club",
  SUPPORT = "support",
  FAVORITES = "favorites",
  ORDERS = "orders",
  MESSAGES = "messages",
  FRIENDS = "friends",
  PROFILE = "profile",
}
