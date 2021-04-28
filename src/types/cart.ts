import { Document, Model } from "mongoose";
import { Product } from "./product";

export interface Cart {
  _id: string;
  clientId: string;
  products: Array<Product | String>;
}

export interface CartDoc extends Document {
  _id: string;
  clientId: string;
  products: Array<Product | String>;
}

export interface CartDocPopulated extends Document {
  _id: string;
  clientId: string;
  products: Array<Product>;
  total: number;
}

export type CartDocument = Model<CartDoc | CartDocPopulated>;

export type CartDocumentPopulated = Model<CartDoc | CartDocPopulated>;

export interface CartModel extends CartDocument {
  addProduct(
    this: CartDocument,
    clientId: string,
    productId: string
  ): Promise<void>;
  removeProduct(
    this: CartDocument,
    clientId: string,
    productId: string
  ): Promise<void>;
  calculateTotal(this: CartDocumentPopulated, clientId: string): Promise<any>;
}
