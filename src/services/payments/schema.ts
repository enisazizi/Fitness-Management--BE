import { Schema, model } from "mongoose";
import { PaymentDoc, PaymentDocument } from "../../types/payment";

const paymentSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "Clients" },
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Products", required: true }],
  total: Number,
  description: String,
});

export const paymentModel = model<PaymentDoc, PaymentDocument>(
  "Payment",
  paymentSchema
);
