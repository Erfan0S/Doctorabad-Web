export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'PATCH',
  DELETE = 'delete',
}

export type RequestOptions = Omit<RequestInit, 'method' | 'headers'> & {
  params?: { [key: string]: any };
  headers?: { [key: string]: string };
  next?:any
};

export type ResponseSchema<T = any> = {
  status: number;
  data: T;
};

export interface ResponseType<D = any> {
  status: number;
  data: D;
}


export type RequestConfig = {
  baseUrl: string;
  isServerSide:()=>boolean;
  showToast:(message:string,options:any)=>void;
}