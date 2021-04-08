import express = require("express");
const services = express();
import endpoints from "express-list-endpoints";

import authRouter from "./auth/router";
import companyRouter from "./company/router";
import clientRouter from "./clients/router";
import activityRouter from "./clientActivity/router";
import productRouter = require("./products/router");

services.use("/company", companyRouter);
services.use("/auth", authRouter);
services.use("/client", clientRouter);
services.use("/product", productRouter);
services.use("/activity", activityRouter);

// endpoints(services).forEach((e) =>
//   console.log(e.path + "---methods " + e.methods)
// );
export = services;
