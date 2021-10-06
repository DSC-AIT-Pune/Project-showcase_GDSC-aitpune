require("dotenv").config();
const express = require("express");
const router = express.Router();
const UserDetail = require("../models/user");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const store = require("store");
const cookieParser = require('cookie-parser');



const bcrypt = require("bcrypt");

router.use(cookieParser());
router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/signUp", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserDetail({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const userSaver = await user.save();
    res.json(userSaver);
    res.status(201).send("Success");
  } catch (error) {
    res.status(500).send(error);
  }
});

let refreshTokens = [];

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({
      email: user.email,
    });
    res.json({ accessToken: accessToken });
  });
});

router.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const foundUser = await UserDetail.findOne({ email });
  
  console.log(foundUser);

  if (foundUser == null) {
    return res.status(400).send("cannot find this user");
  } else {
    try {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        const user = { email: email };

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        console.log(accessToken);
        // localStorage.setItem("jwtToken", JSON.stringify(accessToken));


        // store.set("jwtToken", accessToken.toString());
        // const details = await UserDetail.find({ email: req.user.email });
        // console.log(details);
        res
          .status(200)

          .json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.send("not allowed");
      }
    } catch {
      res.status(500).send("its a catch");
    }
  }
});
router.delete("/logout", (req, res) => {
  const accessToken = {};
  store.set("jwtToken", accessToken.toString());
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = router;
