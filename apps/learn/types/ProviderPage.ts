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
  id: number;
  name: string;
  summary: string;
  description: string;
  avatar: number;
  DT_RowId: number;
  shop_products: ShopProduct[];
  avatar_file: AvatarFile;
}
