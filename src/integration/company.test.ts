import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { companyModel } from "../services/company/schema";

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
  let companyTest = {
    name: "Test",
    email: "test@test.com",
    username: "test",
    password: "Test123!",
  };
  let client = new companyModel(companyTest);

  await client.save();
  id = client._id;
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

let token: string;
let id: string;

test("/signup - should return the new user", async () => {
  const req = await request(app)
    .post("/api/company")
    .send({
      name: "Test1",
      email: "test1@test.com",
      username: "test1",
      password: "Test123!",
    })
    .expect(201);
  const check = await companyModel.findOne({ username: "test" });
});

test("/auth/login - should return token ", async () => {
  const req = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "Test123!",
    })
    .expect(200);
  token = req.text;
});

test("/api/company/me - should return company info", async () => {
  const req = await request(app)
    .get("/api/company/me ")
    .set("Cookie", [`token=${token}`])
    .expect(200);
});

test("/api/company/ - Edit company info ", async () => {
  const req = await request(app)
    .put("/api/company ")
    .set("Cookie", [`token=${token}`])
    .send({
      name: "TEST3",
    })
    .expect(200);
});
test("/api/company/ - try to edit company without cookie ", async () => {
  const req = await request(app)
    .put("/api/company ")
    .send({
      name: "TEST3",
    })
    .expect(401);
});

test("/api/company/ - Delete company profile ", async () => {
  const req = await request(app)
    .delete("/api/company ")
    .set("Cookie", [`token=${token}`])
    .expect(200);
});
