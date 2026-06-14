export enum RequestMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "PATCH",
  DELETE = "delete",
}

export type RequestOptions = Omit<RequestInit, "method" | "headers"> & {
  params?: { [key: string]: any };
  headers?: { [key: string]: string };
  next?: any;
  preventLogoutOnAuthError?: boolean;
};

export type ResponseSchema<T = any> = {
  status: number;
  data: T;
};

export type RequestConfig = {
  baseUrl: string;
  isServerSide: () => boolean;
  showToast: (message: string, options: any) => void;
};
