import { ProductStorage } from "../utils/storages/products.storage.js";

export const ADMIN_USERNAME = `${process.env.ADMIN_USERNAME}`;
export const ADMIN_PASSWORD = `${process.env.ADMIN_PASSWORD}`;
export const Products = new ProductStorage();
