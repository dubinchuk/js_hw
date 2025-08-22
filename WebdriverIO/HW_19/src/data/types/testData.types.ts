export type DataType = 'valid' | 'invalid';
export type DataItem<T> = {
  [K in keyof T]?: any;
} & { description: string };

export type TestData<T> = Record<DataType, Record<keyof T, DataItem<T>[]>>;
