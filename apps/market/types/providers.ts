import { AvatarFile } from "@repo/core/types/general";

export interface ProviderInList {
  id: number;
  name: string;
  avatar: number;
  DT_RowId: number;
  avatar_file: null | AvatarFile;
}

export type ProvidersList = ProviderInList[];
