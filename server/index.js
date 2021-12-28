const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");

dotenv.config();
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGGO_USER}:${process.env.MONGGO_PASSWORD}@cluster0.sbb2m.mongodb.net/app?retryWrites=true&w=majority`
  );
  console.log("Connected to mongoDB ");
}
main().catch((err) => {
  console.log(err.message);
  process.exit(1);
});
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
