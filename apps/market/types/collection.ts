import { PaginatedResponse } from "@repo/core/types/general";
import { Product } from "@repo/core/types/product";

export type CollectionListItem = {
  id: number;
  title: string;
  description: string | null;
  pic_url: string;
};

export type CollectionListResponse = {
  data: CollectionListItem[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

export interface CollectionSingleType extends PaginatedResponse<Product[]> {
  collection: CollectionListItem;
}
