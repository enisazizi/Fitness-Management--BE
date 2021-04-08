import { Document, Model } from "mongoose";
import { Product } from "./product";

export interface Client {
  _id?: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  company_id: string;
  image?: string;
  product: string;
  bodyWork: any;
  accessToken: string;
  cart?: Array<any> ;
}

export interface ClientDoc extends Document {
  _id: string;
  name: string;
  accessToken: string;
  username: string;
  email: string;
  company_id: string;
  password?: string;
  image?: string;
  product: string;
  bodyWork: any;
  cart: Array<any>;
}
export type ClientDocument = Model<ClientDoc>;

export interface ClientModel extends ClientDocument {
  findByCred(
    this: ClientDocument,
    username: string,
    password: string
  ): Promise<Client | undefined>;
}
export interface ClientModel extends ClientDocument {
  findProductInCart(this: ClientDocument, _id: string, product: any): ClientDoc;
  addProductToCart(this: ClientDocument, _id: string, product: any): void;
  incrementCartQuantity(
    this: ClientDocument,
    _id: string,
    product: any,
    quantity: number
  ): void;
  calculateCartTotal(_id: string): any;
  removeFromCart(this: ClientDocument, _id: string, product: any): void;
}
