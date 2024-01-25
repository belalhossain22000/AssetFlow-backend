import { z, } from 'zod';

// Define a Zod schema for the Sale model
export const saleValidationSchema = z.object({
  productId: z.string(), 
  quantity: z.number().min(1),
  buyerName: z.string().min(1),
  saleDate: z.string(),
});