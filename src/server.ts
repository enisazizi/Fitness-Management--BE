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
      "mongodb+srv://enith:123123@cluster0.hcnlo.mongodb.net/testBe",
    dbOptions
  )
  .then((e) => {
    console.log("ok");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(port, () => console.log("listening on port ", port));
