const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const url = process.env.MONGO_URI;

//Ddw7iOjY5K6lf75l password for mongo cloud

const app = express();
app.use(express.static(path.resolve(__dirname, "/build")));
app.use(cors());
app.options("*", cors());

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", function () {
  console.log("connected...");
});

app.use(express.json());

const authRouter = require("./routes/loginSign");
app.use("/al", authRouter);

const user_info_Router = require("./routes/info_of_user");
app.use("/a", user_info_Router);

const notes_submit = require("./routes/notes");
app.use("/note", notes_submit);

app.listen(process.env.PORT || 4001, () => {
  console.log("its working");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
