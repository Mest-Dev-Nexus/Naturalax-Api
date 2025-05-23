import Joi from 'joi';
import { deliveryAddressModel } from '..models/deliveryAddress.js';

export const orderValidationSchema = Joi.object({
  
  deliveryAddress: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  status: Joi.string()
    .valid('not paid', 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
    .default('pending'),
  totalPrice: Joi.number().positive().required(),
  deliveryFee: Joi.number().optional(),
  internationaldeliveryRequired: Joi.boolean().optional(),
  user: Joi.string().required(),
  
});