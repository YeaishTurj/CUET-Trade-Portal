const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json({ limit: "25mb" }));

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ no trailing slash!
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    limit: "25mb",
  })
);

app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const authRoute = require("./src/users/user.route");

app.use("/api/auth", authRoute);

main()
  .then(() => console.log("MongoDB is succesfully connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("CUET Trade Lost & Found Portal Backend is running!");
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
