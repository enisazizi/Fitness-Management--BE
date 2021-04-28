"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3030;
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
mongoose_1.default
    .connect(process.env.DATABASE ||
    "mongodb://localhost:27017/fitness-management-Backend", dbOptions)
    .then((e) => {
    console.log("ok");
})
    .catch((e) => {
    console.log(e);
});
app_1.default.listen(port, () => console.log("listening on port ", port));
