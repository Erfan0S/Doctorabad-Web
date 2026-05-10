import { Apps } from "./general";

export type SelectFilterItems = {
  id: number | string;
  title: string;
  childern?: SelectFilterItems[];
};

export type FilterModalType = {
  title: string;
  items: SelectFilterItems[];
  showTitle?: boolean;
  queryKey?: string;
  app: Apps;
  singleSelection?: boolean;
  customContent?: React.ReactNode;
};

export interface SelectQroupItemType
  extends Pick<FilterModalType, "title" | "customContent"> {
  data?: Array<SelectFilterItems>;
  name?: string;
  dontAddQuery?: boolean;
  loading: boolean;
  isActive: boolean;
  dependencies?: string[];
  className?: string;
  multiSelection?: boolean;
}
