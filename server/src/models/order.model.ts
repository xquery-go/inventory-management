import { Schema, models, model, Model } from "mongoose";

interface IOrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
}

interface IOrder {
  orderItems: IOrderItem[];
  totalAmount: number;
  couponCode?: string;
  discount?: number;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  paymentMethod: "cash_on_delivery" | "online";
  customer: Schema.Types.ObjectId;
  orderStatus: "pending" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  notes?: string;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderItems: {
      type: [OrderItemSchema],
      required: [true, "Order items are required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    couponCode: String,
    discount: Number,
    shippingAddress: {
      type: AddressSchema,
      required: [true, "Shipping address is required"],
    },
    billingAddress: {
      type: AddressSchema,
      required: [true, "Billing address is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "online"],
      required: [true, "Payment method is required"],
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    trackingNumber: String,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", OrderSchema);
