import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3030;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(
    process.env.DATABASE ||
      "mongodb://localhost:27017/fitness-management-Backend",
    dbOptions
  )
  .then((e) => {
    console.log("ok");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(port, () => console.log("listening on port ", port));
