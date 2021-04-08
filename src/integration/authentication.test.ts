import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { companyModel } from "../services/company/schema";
import { clientModel } from "../services/clients/schema";

beforeAll(async () => {
  //Connecting to a new db to seperate the environments
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  //   if (!process.env.DB_URI) throw new Error("DB CONNECTION PROBLEM");
  mongoose
    .connect("mongodb://localhost:27017/fitness-management-Backend", dbOptions)
    .then((e) => {
      console.log("ok");
    })
    .catch((e) => {
      console.log(e);
    });
  //Clearing database  before each test.Needed so it won't get validation errors
  await companyModel.deleteMany({});
  await clientModel.deleteMany({});
  let companyTest = {
    name: "Test",
    email: "test@test.com",
    username: "test",
    password: "Test123!",
  };

  let company = new companyModel(companyTest);
  await company.save();

  const userTest = {
    name: "userTest",
    email: "usertest@test.com",
    company_id: company._id,
    password: "Test123!",
    username: "test1",
  };
  let client = new clientModel(userTest);

  await client.save();
  id = company._id;
  clientId = client._id;
  console.log(clientId);
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
let clientId: string;
let id: string;

test("/auth/login - should return token ", async () => {
  const req = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "Test123!",
    })
    .expect(200);
});
test("/auth/clientLogin -  ", async () => {
  const req = await request(app)
    .post("/api/auth/clientLogin")
    .send({
      username: "test1",
      password: "Test123!",
    })
    .expect(200);
});
