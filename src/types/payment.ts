import { Document, Model } from "mongoose";
import { Product, ProductDoc } from "./product";

export interface Payment {
  _id?: string;
  clientId?: string;
  companyId: string;
  total: number;
  description: string;
}

export interface PaymentDoc extends Document {
  _id?: string;
  clientId?: string;
  companyId: string;
  products: Array<string | ProductDoc>;
  total: string;
}

export type PaymentDocument = Model<PaymentDoc>;
