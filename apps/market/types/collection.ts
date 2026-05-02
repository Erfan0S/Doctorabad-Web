import { PaginatedResponse } from "@repo/core/types/general";
import { Product } from "@repo/core/types/product";

export type CollectionListItem = {
  id: number;
  title: string;
  description: string | null;
  pic_url: string;
};

export interface CollectionSingleType extends PaginatedResponse<Product[]> {
  collection: CollectionListItem;
}
