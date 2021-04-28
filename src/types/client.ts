import { Document, Model } from "mongoose";
import { Product } from "./product";

export interface Client {
  _id?: string;
  name: string;
  email?: string;
  username: string;
  password?: string;
  company_id: string;
  image?: string;
  accessToken: string;
}

export interface ClientDoc extends Document {
  _id: string;
  name: string;
  accessToken: string;
  username: string;
  email?: string;
  company_id: string;
  password?: string;
  image?: string;

}
export type ClientDocument = Model<ClientDoc>;

export interface ClientModel extends ClientDocument {
  findByCred(
    this: ClientDocument,
    username: string,
    password: string
  ): Promise<Client | undefined>;}
