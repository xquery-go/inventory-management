"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
    },
    description: {
        type: String,
        required: [true, "Product Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product Category is required"],
    },
    stock: {
        type: Number,
        default: 0,
    },
    images: {
        type: [String],
        required: [true, "Product Images are required"],
    },
}, {
    timestamps: true,
});
exports.Product = mongoose_1.models.Product || (0, mongoose_1.model)("Product", ProductSchema);
