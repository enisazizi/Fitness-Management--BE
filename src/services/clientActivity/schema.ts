import { Schema, model } from "mongoose";
import { ActivityDoc, ActivityDocument } from "../../types/activity";

const activicySchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, required: true },
  companyId: { type: Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, default: new Date() },
  checkOut: { type: Date },
  type: { type: String, default: "All" },
});

const activityModel = model<ActivityDoc>("Activity", activicySchema);

export default activityModel;
