import { Schema, model, Types } from "mongoose";


const productSchema=  new Schema({
 name: {type: string, required: true,
    unique: [true, 'product name must be unique'] 
 },
 price: {type: number, required : true },
 description: { type: string, required: true},
 quantity : { type: number, required:true},
 pictures: [{ type: string, required: true}],
 userId: { type: Types.ObjectId, required: true, ref: 'User'}

}, { 
    timestamps: true
});

export const productModel = model ('Product', productSchema);