import express = require("express")
const services:express.Application = express()

import companyRouter from "./company/router"
import authRouter from "./auth/router"
import clientRouter from "./clients/router"
import productRouter = require("./products/router")

services.use("/company",companyRouter)
services.use("/auth",authRouter)
services.use("/client",clientRouter)
services.use("/product",productRouter)

export = services