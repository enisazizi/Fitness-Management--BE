import mongoose from "mongoose";
import express = require("express");
const app: express.Application = express();
import services from "./services"
const port = process.env.PORT || 3030;

app.use(express.json());
app.use("/api", services)

mongoose
  .connect(process.env.DATABASE || "mongodb://localhost:27017/fitness-management-Backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((e) => {
    console.log("ok");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(port, () => console.log("listening on port ", port));