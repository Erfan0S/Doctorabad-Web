import {Apps} from "./general";

export type SelectFilterItems = {id: number | string; title: string};

export type FilterModalType = {
  title: string;
  items: SelectFilterItems[];
  queryKey: string;
  app: Apps;
  singleSelection?: boolean;
};

export type SelectQroupItemType = {
  title: string;
  data: Array<any>;
  name: string;
  loading: boolean;
  isActive: boolean;
  dependencies?: string[];
  className?: string;
};
