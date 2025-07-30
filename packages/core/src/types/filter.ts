import { Apps } from "./general";

export type FilterModalType = {
  title: string;
  items: { id: number | string; title: string }[];
  queryKey: string;
  app: Apps;
  singleSelection?: boolean;
};
