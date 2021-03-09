import express = require("express")
const services:express.Application = express()

import companyRouter from "./company/router"
import authRouter from "./auth/router"


services.use("/company",companyRouter)
services.use("/auth",authRouter)


export = services