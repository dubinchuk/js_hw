export interface IApiError {
  status: number;
  statusText: string;
  body: any;
  message: string;
}

export interface IFetchError extends Error {
  response?: Response;
  status?: number;
  statusText?: string;
  body?: any;
}
