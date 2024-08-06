"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});
const OrderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.Order = mongoose_1.models.Order || (0, mongoose_1.model)("Order", OrderSchema);
