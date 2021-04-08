import { Document, Model } from "mongoose";

export interface Activity {
  clientId: string;
  companyId: string;
  checkIn: Date;
  checkOut: Date;
  type: string;
}

export interface ActivityDoc extends Document {
  _id: string;
  clientId: string;
  companyId: string;
  checkIn: Date;
  checkOut: Date;
  type: string;
}

export type ActivityDocument = Model<ActivityDoc>;
