import {Schema, model} from 'mongoose';
import normalizeMongoose from 'normalize-mongoose';

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    deliveryAddress: { type: String, },
    city: { type: String, },
    country: { type: String, },
    region: { type: String, }
  },
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  
  costing: {
    subTotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    amountAfterDiscount: { type: Number, required: true },
    deliveryCost: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    discountApplied: { type: Boolean, default: false },
    deliveryId: { type: Schema.Types.ObjectId, ref: 'deliveryAddress', default: null }
  }
  ,
  status: {
    type: String,
    enum: ["not paid",'pending', 'completed', 'cancelled'],
    default: 'not paid'
  }
}, { timestamps: true });
orderSchema.plugin(normalizeMongoose);
export const OrderModel = model('Order', orderSchema);