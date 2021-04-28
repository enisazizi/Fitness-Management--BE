"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const schema_1 = __importDefault(require("./schema"));
const schema_2 = require("../clients/schema");
const errors_1 = require("../../types/errors");
const checkIn = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const client = yield schema_2.clientModel.findById((_a = req.client) === null || _a === void 0 ? void 0 : _a._id);
        const newActivity = new schema_1.default({
            clientId: (_b = req.client) === null || _b === void 0 ? void 0 : _b._id,
            companyId: client === null || client === void 0 ? void 0 : client.company_id,
            checkIn: new Date(),
            type: req.params.type,
        });
        newActivity.save();
        res.status(200).send(newActivity);
    }
    catch (error) {
        nex(new errors_1.errorMessage("something went wrong", 500));
    }
});
const checkOut = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.client)
            return;
        // const activity = await activityModel.find({ clientId: req.client._id });
        let activity = yield schema_1.default.find({ clientId: req.client._id });
        activity = activity.filter((elem) => !elem.checkOut);
        const endActivity = yield schema_1.default.findByIdAndUpdate(activity[0]._id, {
            checkOut: new Date(),
        });
        res.status(200).send(endActivity);
    }
    catch (error) {
        nex(new errors_1.errorMessage("something went wrong", 500));
    }
});
const clientActivity = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.client)
            return;
        // const activity = await activityModel.find({ clientId: req.client._id });
        let activity = yield schema_1.default.find();
        activity = activity.filter((elem) => !elem.checkOut);
        res.status(200).send(activity);
    }
    catch (error) {
        nex(new errors_1.errorMessage("something went wrong", 500));
    }
});
const SingleclientActivity = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.client)
            return;
        // const activity = await activityModel.find({ clientId: req.client._id });
        let activity = yield schema_1.default.find({ clientId: req.client._id });
        activity = activity.filter((elem) => elem.checkOut);
        res.status(200).send(activity);
    }
    catch (error) {
        nex(new errors_1.errorMessage("something went wrong", 500));
    }
});
const companyActivity = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.company)
            return;
        const activity = yield schema_1.default.find({ companyId: req.company._id });
        res.status(200).send(activity);
    }
    catch (error) {
        nex(new errors_1.errorMessage("something went wrong", 500));
    }
});
exports.controller = { checkIn, checkOut, clientActivity, SingleclientActivity };
