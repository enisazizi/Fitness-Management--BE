import { Document, Model } from "mongoose";

export interface Company {
  _id: string;
  name: string;
  email?: string;
  password: string;
  image?: string;
  business_id: string;
  license_id: string;
  refreshTokens?: [{ token: String }],
}
export interface CompanyDoc extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  business_id: string;
  license_id: string;
  refreshTokens?: [{ token: String }],
}
export type CompanyDocument = Model<CompanyDoc>;

export interface CompanyModel extends CompanyDocument {
  findByCred(
    this: CompanyDoc,
    email: string,
    password: string
  ): Promise<Company | undefined>;
  updateStatus(
    this: CompanyModel,
    id: string,
    status: boolean
  ): Promise<CompanyDoc | undefined>;
}