import mongoose, { Schema } from 'mongoose';
import { SaleItem } from './salse.interface';


const saleSchema = new Schema<SaleItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Shoes',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  buyerName: {
    type: String,
    required: true,
  },
  saleDate: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});



// Create the Sale model
export const SaleModel = mongoose.model<SaleItem>('Sale', saleSchema);


