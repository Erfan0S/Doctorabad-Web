export interface AvatarFile {
  id: number;
  info: {
    path: string;
    bucket: string;
  };
}

export interface ShopProduct {
  id: number;
  provider_id: number;
  title: string;
  title_en: string;
  avatar: number;
  main_price: number;
  off_price: number;
  DT_RowId: number;
}

export interface SingleProviderType {
  data: {
    picture: string;
    main_price: number | null;
    off_price: number | null;
    sell_count: number;
    download_count: number;
    language: number;
    publish_date: string | null;
    installment_payment: boolean;
    category: { id: number; title: string }[];
    provider: string;
  }[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  publisher: {
    id: number;
    name: string;
    summary: string;
    description: string;
    picture: string;
  };
}
