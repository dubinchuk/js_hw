export interface IRequestOptions<T> {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: T;
  headers?: Record<string, string>;
}

export interface IResponse<T> {
  status: number;
  body: T;
  headers: Record<string, string>;
}

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  DELETED = 204
}

export interface ApiClient {
  send<RequestT, ResponseT>(options: IRequestOptions<RequestT>): Promise<IResponse<ResponseT>>;
}
