import express = require("express");
const services = express();
import endpoints from "express-list-endpoints";


import authRouter from "./auth/router";
import companyRouter from "./company/router";
import clientRouter from "./clients/router";
import activityRouter from "./clientActivity/router";
import productRouter from "./products/router";
import cartRouter from "./cart/router";
import paymentRouter from "./payments/router";


services.use("/company", companyRouter);
services.use("/client", clientRouter);
services.use("/auth", authRouter);
services.use("/product", productRouter);
services.use("/activity", activityRouter);
services.use("/cart", cartRouter);
services.use("/payment", paymentRouter);
// endpoints(services).forEach((e) =>
//   console.log(e.path + "---methods " + e.methods)
// );
export = services;
