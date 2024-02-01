import { ObjectId } from "mongoose";

export type SaleItem = {
  price: number;
  productName: string
  productId: ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: string;
};