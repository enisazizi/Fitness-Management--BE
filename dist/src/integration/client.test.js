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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../services/company/schema");
const schema_2 = require("../services/clients/schema");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //Connecting to a new db to seperate the environments
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    //   if (!process.env.DB_URI) throw new Error("DB CONNECTION PROBLEM");
    mongoose_1.default
        .connect("mongodb://localhost:27017/fitness-management-Backend", dbOptions)
        .then((e) => {
        console.log("ok");
    })
        .catch((e) => {
        console.log(e);
    });
    //Clearing database  before each test.Needed so it won't get validation errors
    yield schema_1.companyModel.deleteMany({});
    yield schema_2.clientModel.deleteMany({});
    let companyTest = {
        name: "Test",
        email: "test@test.com",
        username: "test",
        password: "Test123!",
    };
    let company = new schema_1.companyModel(companyTest);
    yield company.save();
    const userTest = {
        name: "userTest",
        email: "usertest@test.com",
        company_id: company._id,
        password: "Test123!",
        username: "test1",
    };
    let client = new schema_2.clientModel(userTest);
    yield client.save();
    id = client._id;
}));
afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose_1.default.connection.close();
    done();
});
let token;
let id;
test("/auth/clientLogin -  ", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .post("/api/auth/clientLogin")
        .send({
        username: "test1",
        password: "Test123!",
    })
        .expect(200);
    token = req.text;
}));
test("/api/client/all", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .get("/api/client/all")
        .set("Cookie", [`token=${token}`])
        .expect(200);
}));
test("/api/client/:id", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .get(`/api/client/${id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
}));
test("/api/client/", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .put(`/api/client`)
        .set("Cookie", [`token=${token}`])
        .send({ name: "boss" })
        .expect(200);
}));
test("/api/client/", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .delete(`/api/client`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
}));
