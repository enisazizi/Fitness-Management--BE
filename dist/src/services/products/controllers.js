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
const newProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProductInfo = new schema_1.productModel(Object.assign({}, req.body));
        const { _id } = yield newProductInfo.save();
        res.status(201).send(_id);
    }
    catch (error) {
        next(error);
    }
});
const newProdPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myProduct = yield schema_1.productModel.findByIdAndUpdate(req.params.id, {
            $set: {
                image: req.file.path,
            },
        });
        if (myProduct) {
            const { _id } = yield myProduct.save();
            res.status(201).send(_id);
        }
        else {
            throw new Error("photo failed to upload produdct doest exists");
        }
    }
    catch (error) {
        next(error);
    }
});
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = yield schema_1.productModel.findOne({ _id: req.params.id });
        res.status(200).send(prod);
    }
    catch (error) {
        next(error);
    }
});
const getAllProdcts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProdcts = yield schema_1.productModel.find({});
        res.status(200).send(allProdcts);
    }
    catch (error) {
        next(error);
    }
});
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file && req.file.path) {
            console.log("its this working", req.file);
            const editProd = yield schema_1.productModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    image: req.file.path,
                },
            });
            if (editProd) {
                const { _id } = yield editProd.save();
                res.status(201).send(_id);
            }
            else {
                throw new Error("Post doesnt exist");
            }
        }
        else {
            const editProd = yield schema_1.productModel.findByIdAndUpdate(req.params.id, {
                $set: Object.assign({}, req.body)
            }, { new: true });
            if (editProd) {
                const { _id } = yield editProd.save();
                res.status(201).send(_id);
            }
            else {
                throw new Error("Post doest exist");
            }
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteProd = yield schema_1.productModel.findByIdAndDelete(req.params.id);
        res.status(204).send("deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    newProduct,
    newProdPhoto,
    getProduct,
    getAllProdcts,
    editProduct,
    deleteProduct,
};
