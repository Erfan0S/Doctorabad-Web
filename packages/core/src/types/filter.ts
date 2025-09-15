import { Apps } from "./general";

export type SelectFilterItems = {
  id: number | string;
  title: string;
  childern?: SelectFilterItems[];
};

export type FilterModalType = {
  title: string;
  items: SelectFilterItems[];
  queryKey?: string;
  app: Apps;
  singleSelection?: boolean;
};

export type SelectQroupItemType = {
  title: string;
  data: Array<SelectFilterItems>;
  name?: string;
  dontAddQuery?: boolean;
  loading: boolean;
  isActive: boolean;
  dependencies?: string[];
  className?: string;
  multiSelection?: boolean;
  initialTitle?: string;
};
