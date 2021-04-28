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
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const errors_1 = require("../../types/errors");
const newCompany = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompany = new schema_1.companyModel(Object.assign({}, req.body));
        const { _id } = yield newCompany.save();
        res.status(201).send(_id);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 500));
    }
});
const getCompany = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.company) === null || _a === void 0 ? void 0 : _a.id))
            return;
        const company = yield schema_1.companyModel
            .findById((_b = req.company) === null || _b === void 0 ? void 0 : _b._id)
            .select({ password: 0, __v: 0 });
        res.status(200).send(company);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 404));
    }
});
const getAllCompanies = (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompanies = yield schema_1.companyModel.find();
        res.send(allCompanies);
    }
    catch (error) {
        nex(new errors_1.errorMessage(error.message, 404));
    }
});
function editCompany(req, res, nex) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            delete req.body.password;
            let company = yield schema_1.companyModel.findByIdAndUpdate((_a = req.company) === null || _a === void 0 ? void 0 : _a._id, req.body);
            const update = { updated: req.body };
            res.status(200).send(update);
        }
        catch (error) {
            nex(new errors_1.errorMessage(error.message, 404));
        }
    });
}
function deleteCompany(req, res, nex) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = req.company) === null || _a === void 0 ? void 0 : _a._id))
            return;
        try {
            let company = yield schema_1.companyModel.findByIdAndDelete(req.params.id);
            res.status(200).send(company);
        }
        catch (error) {
            console.log(error);
            nex(new errors_1.errorMessage(error.message, 400));
        }
    });
}
exports.default = {
    newCompany,
    getCompany,
    getAllCompanies,
    editCompany,
    deleteCompany,
};
