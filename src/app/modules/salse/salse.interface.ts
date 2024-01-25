import { ObjectId } from "mongoose";

export type SaleItem = {
    productId: ObjectId;
    quantity: number;
    buyerName: string;
    saleDate: string; 
  };