"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required:true,
    },
    price: {
        type: Number,
        // required:true,
    }
});
exports.productModel = mongoose_1.model("Product", productSchema);
