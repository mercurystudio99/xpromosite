import mongoose, { Document, Schema } from 'mongoose';
import { ProductSizeType } from '../types/product';

// Order status enum
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

// Payment status enum
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Payment method enum
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT'
}

// Interfaces
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  productSnapshot: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number; // Price at the time of purchase
  size?: ProductSizeType;
  variant?: string; // Variant SKU or ID
  attributes?: Record<string, string>; // Any additional attributes
}

export interface IAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email?: string;
  isDefault?: boolean;
}

export interface IOrderTracking {
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippedAt?: Date;
  estimatedDeliveryDate?: Date;
  deliveredAt?: Date;
}

export interface IPaymentDetails {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amount: number;
  currency: string;
  paidAt?: Date;
  cardLast4?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId; // Optional for guest checkout
  items: IOrderItem[];
  shippingAddress: IAddress;
  billingAddress?: IAddress;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  notes?: string;
  payment: IPaymentDetails;
  tracking?: IOrderTracking;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  
  // Virtual properties
  itemCount: number;
  
  // Instance methods
  getOrderSummary(): {
    items: number;
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
  };
  markAsPaid(transactionId: string): Promise<IOrder>;
  updateStatus(status: OrderStatus): Promise<IOrder>;
}

// Schemas
const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productSnapshot: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  size: { type: String },
  variant: { type: String },
  attributes: { type: Schema.Types.Mixed }
}, { _id: false });

const AddressSchema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const TrackingSchema = new Schema<IOrderTracking>({
  carrier: { type: String },
  trackingNumber: { type: String },
  trackingUrl: { type: String },
  shippedAt: { type: Date },
  estimatedDeliveryDate: { type: Date },
  deliveredAt: { type: Date }
}, { _id: false });

const PaymentDetailsSchema = new Schema<IPaymentDetails>({
  method: { 
    type: String, 
    enum: Object.values(PaymentMethod),
    required: true 
  },
  status: { 
    type: String, 
    enum: Object.values(PaymentStatus),
    required: true,
    default: PaymentStatus.PENDING
  },
  transactionId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  paidAt: { type: Date },
  cardLast4: { type: String }
}, { _id: false });

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { 
      type: String, 
      required: true, 
      unique: true,
      index: true
    },
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    items: { 
      type: [OrderItemSchema], 
      required: true,
      validate: [
        {
          validator: function(items: IOrderItem[]) {
            return items.length > 0;
          },
          message: 'Order must contain at least one item'
        }
      ]
    },
    shippingAddress: { 
      type: AddressSchema, 
      required: true 
    },
    billingAddress: { 
      type: AddressSchema
    },
    status: { 
      type: String, 
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
      required: true 
    },
    subtotal: { 
      type: Number, 
      required: true 
    },
    tax: { 
      type: Number, 
      required: true,
      default: 0 
    },
    shippingCost: { 
      type: Number, 
      required: true,
      default: 0 
    },
    discount: { 
      type: Number,
      default: 0 
    },
    total: { 
      type: Number, 
      required: true 
    },
    notes: { 
      type: String 
    },
    payment: {
      type: PaymentDetailsSchema,
      required: true
    },
    tracking: {
      type: TrackingSchema
    },
    completedAt: { 
      type: Date 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'payment.status': 1 });
OrderSchema.index({ createdAt: -1 });

// Virtual properties
OrderSchema.virtual('itemCount').get(function(this: IOrder) {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Instance methods
OrderSchema.methods.getOrderSummary = function(this: IOrder) {
  return {
    items: this.itemCount,
    subtotal: this.subtotal,
    shipping: this.shippingCost,
    tax: this.tax,
    discount: this.discount,
    total: this.total
  };
};

// Mark order as paid
OrderSchema.methods.markAsPaid = async function(this: IOrder, transactionId: string): Promise<IOrder> {
  this.payment.status = PaymentStatus.PAID;
  this.payment.transactionId = transactionId;
  this.payment.paidAt = new Date();
  
  if (this.status === OrderStatus.PENDING) {
    this.status = OrderStatus.PROCESSING;
  }
  
  return this.save();
};

// Update order status
OrderSchema.methods.updateStatus = async function(this: IOrder, status: OrderStatus): Promise<IOrder> {
  this.status = status;
  
  if (status === OrderStatus.DELIVERED) {
    this.completedAt = new Date();
    if (this.tracking) {
      this.tracking.deliveredAt = new Date();
    }
  }
  
  if (status === OrderStatus.SHIPPED && this.tracking) {
    this.tracking.shippedAt = new Date();
  }
  
  return this.save();
};

// Pre-save hook to validate total
OrderSchema.pre('save', function(next) {
  // Calculate the total if not correctly set
  const calculatedTotal = 
    this.subtotal + 
    this.tax + 
    this.shippingCost - 
    this.discount;
  
  // Round to 2 decimal places to avoid floating point issues
  const roundedCalculated = Math.round(calculatedTotal * 100) / 100;
  const roundedTotal = Math.round(this.total * 100) / 100;
  
  // If the totals don't match (allowing for tiny rounding errors)
  if (Math.abs(roundedCalculated - roundedTotal) > 0.01) {
    this.total = roundedCalculated;
  }
  next();
});

// Auto-generate order number before saving if not provided
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ORD-${timestamp.substr(-6)}-${randomPart}`;
  }
  next();
});

// Create the model
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;