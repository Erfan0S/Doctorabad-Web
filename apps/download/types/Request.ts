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
};


export type ResponseSchema<T = any> = {
  status: number;
  data: T;
};
