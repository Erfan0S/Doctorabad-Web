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
    id: number;
    title: string;
    pic_url: string;
    price_main: number;
    price_off: number | null;
    price_amazing: number | null;
    language: number;
    duration: number;
    student_count: number;
  }[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
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
  provider: {
    id: number;
    name: string;
    summary: string;
    description: string;
    pic_url: string;
  };
}
