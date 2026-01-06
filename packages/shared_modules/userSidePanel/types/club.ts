export type MissionType = {
  id: number;
  title: string;
  point_label: string;
  description: string | null;
  picture: string | null;
  active: boolean;
};

export type UserRankingDetailType = {
  user_ranking: number;
  users_count: number;
  state_detail: string;
};

export type RankingUserType = {
  id: number;
  profile_picture: string | null;
  name: string;
  point_sum: number;
};
