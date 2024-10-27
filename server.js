const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRoute = require("./routes/userRoute");
const dataRoute = require("./routes/dataRoute");

const cors = require("cors");
const port = process.env.PORT || 4000;

const uri =
  "mongodb+srv://admin:admin@cluster0.8ol70.mongodb.net/?retryWrites=true&w=majority";

dotenv.config();
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Database connected...");
  }
);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/user", userRoute);
app.use("/data", dataRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  // res.send("Hey, I'm backend!");
});

app.listen(port, () => {
  console.log("Backend is running on PORT:", port);
});
