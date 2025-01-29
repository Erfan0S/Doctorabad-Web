import { AvatarFile } from "@repo/core/types";

export interface CategoryInList {
  id: number;
  parent: null | number;
  title: string;
  priority: number;
  avatar: null | string;
  DT_RowId: number;
  avatar_file: null | AvatarFile;
  children: CategoryInList[];
}

export type ShortCategory = Pick<CategoryInList, "id" | "DT_RowId" | "title">;

export type CategoryList = CategoryInList[];
