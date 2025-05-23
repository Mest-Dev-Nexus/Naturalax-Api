import mongoose from "mongoose";
import { UserModel } from './baseuser.js';

const userSchema = new mongoose.Schema({
  
  whatsappnumber: { type: String },
  address: {
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
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
    postalCode: {
      type: String,
      trim: true
    }
  }
});

// Create regular user discriminator
export const RegularUserModel = UserModel.discriminator('user', userSchema);
