import { AvatarFile } from './general';

export interface DiscountFestival {
  id: number;
  avatar: AvatarFile | null;
  title: string;
  percent: number | null;
  amount: number | null;
  max_cost: number | null;
  expired_at: string;
  DT_RowId: number;
}
