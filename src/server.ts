import mongoose from "mongoose";
import express = require("express");
const app: express.Application = express();
import cors from "cors"
import services from "./services"
import cookieParser = require("cookie-parser");
const port = process.env.PORT || 3030;
const whitelist = [process.env.REDIRECT_URL];
app.use(express.json());
app.use(cookieParser())
const corsOptions = {
	origin: (origin:any, callback:any) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, //Allow cookie
};
app.use(cors(corsOptions));
app.use("/api", services)
require("./middlewares/errorHandling")(app)

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