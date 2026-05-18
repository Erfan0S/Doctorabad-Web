import { ModalTypes } from "@repo/shared_modules/modalsTypes";
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

export interface AccordionProps extends FilterModalType {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalTypes;
  dependencies?: (string | null)[];
  onClick?: () => void;
  isLoading?: boolean;
  defaultValue?: string;
}

export interface SelectQroupItemType
  extends Pick<AccordionProps, "title" | "customContent" | "defaultValue"> {
  data?: Array<SelectFilterItems>;
  name?: string;
  dontAddQuery?: boolean;
  loading: boolean;
  isActive: boolean;
  dependencies?: string[];
  className?: string;
  multiSelection?: boolean;
}
