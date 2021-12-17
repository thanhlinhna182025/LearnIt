const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");
const dotenv = require("dotenv");

dotenv.config();
// Plan A connect MonggoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://${process.env.MONGGO_USER}:${process.env.MONGGO_PASSWORD}@cluster0.sbb2m.mongodb.net/app?retryWrites=true&w=majority`,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("mongoDB connected");
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// connectDB();
// Plan B connect MonggoDB

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

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
