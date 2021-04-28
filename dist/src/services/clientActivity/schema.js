"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activicySchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    companyId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, default: new Date() },
    checkOut: { type: Date },
    type: { type: String, default: "All" },
});
const activityModel = mongoose_1.model("Activity", activicySchema);
exports.default = activityModel;
