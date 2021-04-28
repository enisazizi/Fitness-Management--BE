"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Clients" },
    companyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Products", required: true }],
    total: Number,
    description: String,
});
exports.paymentModel = mongoose_1.model("Payment", paymentSchema);
