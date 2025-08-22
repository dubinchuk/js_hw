export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T = unknown> {
  status: number;
  body: T;
  headers: Record<string, string>;
}

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  INVALID_REQUEST = 400,
}
