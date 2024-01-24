import { z } from "zod";

const shoeValidationSchema = z.object({
  name: z.string(),
  price: z.string(),
  quantity: z.number(),
  releaseDate: z.string(),
  brand: z.string(),
  model: z.string(),
  style: z.string(),
  size: z.array(z.string()),
  color: z.string(),
  description: z.string(),
  material: z.string().optional(),
  weight: z.string().optional(),
});

export default shoeValidationSchema;
