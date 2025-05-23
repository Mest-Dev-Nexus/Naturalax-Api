import mongoose from 'mongoose';
import normalizeMongoose from 'normalize-mongoose';

const checkoutSchema = new mongoose.Schema(
  {
    // Customer information
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Contact details
    phoneNumber: {
      type: String, // Changed from Number to String to preserve formatting
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{8,15}$/.test(v); // Basic validation for phone numbers
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    
    // delivery information
    deliveryAddress: {
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
      postalCode: {
        type: String,
        trim: true
      }
    },
    
    // Delivery options
    delivery: {
      type: String,
      enum: ['pick-up', 'local-delivery', 'international-delivery'],
      required: true,
      default: 'local-delivery',
    },
    
    // Payment information
    paymentMethod: {
      type: String,
      enum: ['card', 'mobile-money', 'cash-on-delivery'],
      required: true,
    },
    
    // Price calculations
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0
      },
      deliveryFee: {
        type: Number,
        default: 0,
        min: 0
      },
      discount: {
        type: Number,
        default: 0,
        min: 0
      },
      totalAmount: {
        type: Number,
        required: true,
        min: 0
      }
    },
    
    // delivery status
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    
    // International delivery flag
    isInternational: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for full address
checkoutSchema.virtual('fullAddress').get(function() {
  return `${this.deliveryAddress.address}, ${this.deliveryAddress.city}, ${this.deliveryAddress.country}`;
});

// Pre-save middleware to calculate delivery fee
checkoutSchema.pre('save', function(next) {
  const city = this.deliveryAddress.city ? this.deliveryAddress.city.toLowerCase() : '';
  const country = this.deliveryAddress.country ? this.deliveryAddress.country.toLowerCase() : '';
  
  // Set international flag
  this.isInternational = country !== 'ghana';
  
  // Calculate delivery fee based on location
  if (country === 'ghana') {
    if (city === 'accra') {
      this.pricing.deliveryFee = 40;
    } else {
      this.pricing.deliveryFee = 50;
    }
  } else {
    this.pricing.deliveryFee = 0; // Will be determined later
    this.isInternational = true;
  }
  
  // Calculate total amount
  this.pricing.totalAmount = 
    this.pricing.subtotal + 
    this.pricing.deliveryFee + 
    this.pricing.discount;
  
  next();
});


// Static method to find checkouts by user
// checkoutSchema.statics.findByUser = function(userId) {
//   return this.find({ user: userId }).populate('user').exec();
// };

checkoutSchema.plugin(normalizeMongoose);

export const CheckoutModel = mongoose.model('Checkout', checkoutSchema);