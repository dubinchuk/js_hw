export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
export enum MANUFACTURERS {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  MICROSOFT = 'Microsoft',
  SONY = 'Sony',
  XIAOMI = 'Xiaomi',
  AMAZON = 'Amazon',
  TESLA = 'Tesla'
}

export enum PRODUCT_REQUIRENMENTS {
  MIN_PRICE = 1,
  MAX_PRICE = 99999,
  MIN_PRICE_LENGTH = 1,
  MAX_PRICE_LENGTH = 5,
  MIN_AMOUNT = 0,
  MAX_AMOUNT = 999,
  MIN_AMOUNT_LENGTH = 1,
  MAX_AMOUNT_LENGTH = 3,
  MIN_NAME_LENGTH = 3,
  MAX_NAME_LENGTH = 40,
  MIN_NOTES_LENGTH = 0,
  MAX_NOTES_LENGTH = 250
}

export enum PRODUCT_FIELDS {
  NAME = 'Name',
  PRICE = 'Price',
  AMOUNT = 'Amount',
  NOTES = 'Notes'
}
