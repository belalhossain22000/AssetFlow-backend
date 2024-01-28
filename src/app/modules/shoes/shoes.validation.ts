import { z } from "zod";

const shoeValidationSchema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  quantity: z.number(),
  releaseDate: z.string(),
  brand: z.string(),
  model: z.string(),
  style: z.string(),
  size:  z.string(),
  color: z.string(),
  description: z.string(),
  material: z.string().optional(),
  weight: z.string().optional(),
});

export const updateShoeValidationSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  price: z.string().optional(),
  quantity: z.number().optional(),
  releaseDate: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  style: z.string().optional(),
  size: z.array(z.string()).optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  material: z.string().optional(),
  weight: z.string().optional(),
});

export default shoeValidationSchema;
