import express = require("express");
const app = express();
import services from "./services";
import cookieParser = require("cookie-parser");
import cors from "cors"
const whitelist = [process.env.REDIRECT_URL];

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
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());
app.use("/api", services);
require("./middlewares/errorHandling")(app);

export default app;
