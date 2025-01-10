export interface AvatarFile {
  id: number;
  name: string;
  info: {
    path: string;
    bucket: string;
  };
}

export interface ResponseType<D = any> {
  status: number;
  data: D;
}

export interface PaginatedResponse<T> {
  data: T;
  total: number;
}

export type PaginatedRequest<T = {}> = T & { limit: string; page: string };

export type NextPageProps<P = {}> = {
  params: P;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type SelectionItem = {
  id: number;
  title: string;
};

export enum MultimediaType {
  VIDEO = 'video',
  IMAGE = 'image',
}
