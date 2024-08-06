"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Category Name is required"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Category Image is required"],
    },
    parentCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
}, {
    timestamps: true,
});
exports.Category = mongoose_1.models.Category || (0, mongoose_1.model)("Category", CategorySchema);
