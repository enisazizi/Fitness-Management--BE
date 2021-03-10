import { Document, Model } from "mongoose";

export interface Company {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  business_id: string;
  license_id: string;
}
export interface CompanyDoc extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  business_id: string;
  license_id: string;
}
export type CompanyDocument = Model<CompanyDoc>;

export interface CompanyModel extends CompanyDocument {
  findByCred(
    this: CompanyDocument,
    email: string,
    password: string
  ): Promise<Company | undefined>;
  updateStatus(
    this: CompanyDocument,
    id: string,
    status: boolean
  ): Promise<CompanyDoc | undefined>;
  
}
