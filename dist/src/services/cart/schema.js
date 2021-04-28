"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    clientId: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
});
cartSchema.statics.addProduct = function (clientId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const add = yield this.updateOne({ clientId: clientId }, { $push: { products: productId } }).populate("products");
        }
        catch (error) {
            throw error;
        }
    });
};
cartSchema.statics.removeProduct = function (clientId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const remove = yield this.updateOne({ clientId: clientId }, { $pull: { products: productId } });
        }
        catch (error) {
            throw error;
        }
    });
};
cartSchema.statics.calculateTotal = function (clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let cart = yield this.findOne({ clientId }).populate("products");
            let total = 0;
            cart === null || cart === void 0 ? void 0 : cart.products.map((e) => {
                total += e.price;
            });
            const cartWithTotal = Object.assign(Object.assign({}, cart), { total });
            return cartWithTotal;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.cartModel = mongoose_1.model("Cart", cartSchema);
