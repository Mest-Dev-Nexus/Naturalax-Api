import {Schema, model} from 'mongoose';
import normalizeMongoose from 'normalize-mongoose';

const deliveryAddressSchema = new Schema({
  
    country: {
      type: String,
      required: true,
      trim: true
    },
    region: {
      type: String,
      required: true,
      trim: true
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    }
  
})
deliveryAddressSchema.plugin(normalizeMongoose);
export const deliveryAddressModel = model('deliveryAddress', deliveryAddressSchema);