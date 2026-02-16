import { Apps } from "./general";

export type BaseUiProps = {
  app?: Apps;
};

export type ProductListItemProps = {
  lang?: "Fa" | "En" | null;
  title: string;
  id: string;
  pic_url?: string;
  baseUrl: string;
  attributes?: {
    value?: string | number | React.ReactNode | null;
    icon?: React.ReactNode;
  }[];
  installmentPayment?: boolean;
  providerTitle?: string;
};
