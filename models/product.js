import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: 1 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { 
      type: String, 
      enum: ["Hair cream", "Skin care", "Shampoo"], 
      required: true, index: 1
    },
    pictures: [{ type: String, required: true }],
    userId: { type: Types.ObjectId, required: true, index: 1 ,ref: "User" },
  },
  {
    timestamps: true,
  }
);



productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema);