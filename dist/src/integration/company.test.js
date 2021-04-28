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
    let companyTest = {
        name: "Test",
        email: "test@test.com",
        username: "test",
        password: "Test123!",
    };
    let client = new schema_1.companyModel(companyTest);
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
test("/signup - should return the new user", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .post("/api/company")
        .send({
        name: "Test1",
        email: "test1@test.com",
        username: "test1",
        password: "Test123!",
    })
        .expect(201);
    const check = yield schema_1.companyModel.findOne({ username: "test" });
}));
test("/auth/login - should return token ", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .post("/api/auth/login")
        .send({
        email: "test@test.com",
        password: "Test123!",
    })
        .expect(200);
    token = req.text;
}));
test("/api/company/me - should return company info", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .get("/api/company/me ")
        .set("Cookie", [`token=${token}`])
        .expect(200);
}));
test("/api/company/ - Edit company info ", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .put("/api/company ")
        .set("Cookie", [`token=${token}`])
        .send({
        name: "TEST3",
    })
        .expect(200);
}));
test("/api/company/ - try to edit company without cookie ", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .put("/api/company ")
        .send({
        name: "TEST3",
    })
        .expect(401);
}));
test("/api/company/ - Delete company profile ", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield supertest_1.default(app_1.default)
        .delete("/api/company ")
        .set("Cookie", [`token=${token}`])
        .expect(200);
}));
