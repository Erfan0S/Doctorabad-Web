import { Product } from "@repo/core/types/product";
import { AvatarFile, PaginatedResponse } from "@repo/core/types/general";

export interface ProviderInList {
  id: number;
  name: string;
  avatar: number;
  DT_RowId: number;
  avatar_file: null | AvatarFile;
}

export type ProvidersList = ProviderInList[];

export interface Provider extends PaginatedResponse<Product[]> {
  provider: {
    id: number;
    name: string;
    description: string;
    pic_url: string;
    summary: string;
  };
}
