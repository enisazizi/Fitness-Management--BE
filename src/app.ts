import express = require("express");
const app = express();
import services from "./services";
import cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api", services);
require("./middlewares/errorHandling")(app);

export default app;
