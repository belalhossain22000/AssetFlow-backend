import { Schema, model } from "mongoose";
import { TShoes } from "./shoes.interface";



const ShoesSchema: Schema = new Schema<TShoes>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    style: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: String },
    weight: { type: String },
},
    {
        timestamps: true
    });

export const ShoesModel = model<TShoes>('Shoes', ShoesSchema);

