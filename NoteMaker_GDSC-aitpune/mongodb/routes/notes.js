require("dotenv").config();
const express = require("express");
const router = express.Router();
const writtenNotes = require("../models/notesSchema");
const jwt = require("jsonwebtoken");
const store = require("store");
const { json } = require("express");
const cookieParser=require('cookie-parser');

router.use(cookieParser());
// const jwt = require('jsonwebtoken')
async function authenticateToken(req, res, next) {
  // const storeToken = store.get("jwtToken");
  const storeToken = req.cookies.accessTokennpm 
  // const storeToken = req.body.jwtToken;
  // const storeToken = JSON.parse(localStorage.getItem("jwtToken"));

  // console.log(storeToken);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (storeToken) {
    token = storeToken;
  }

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  } catch (err) {
    return next(err);
  }
}

//new notes are here to post
router.post("/writter", authenticateToken, async (req, res) => {
  const notes = new writtenNotes({
    topic: req.body.topic,
    subject: req.body.subject,
    written: req.body.written,
    author: req.user.email,
    //req.user.email
  });

  try {
    const instNotes = await notes.save();
    res.json(instNotes);
  } catch (err) {
    res.send("their is a error above in try");
  }
});

//getting all user notes
router.get("/allSaved", authenticateToken, async (req, res) => {
  const amaze = req.user.email;

  // const amaze = req.user.email;

  const allWrittenNotes = await writtenNotes.find({ author: amaze });
  // console.log(allWrittenNotes);
  // console.log(allWrittenNotes)//ye null kyo aa rha ha ?????

  if (allWrittenNotes == null) {
    res.status(200).json({ success: false });
  } else {
    try {
      res.status(200).json(allWrittenNotes);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
});

// ###############################sharring property ############################
router.get("/resources", authenticateToken, async (req, res) => {
  const amaze = req.user.email;
  // console.log(req.user.email);
  // const user1={user1:amaze}
  // console.log(amaze);

  const allSharedNotes = await writtenNotes.find({ user1: amaze });
  // console.log(allSharedNotes);

  if (allSharedNotes == null) {
    res.send("nothing found about this user");
  } else {
    try {
      res.status(200).json(allSharedNotes);
    } catch (error) {
      res.send(error);
    }
  }
});

router.put("/shareWith", authenticateToken, async (req, res) => {
  const _id = { _id: req.body._id };
  const user1 = { user1: req.body.user1 };

  console.log(user1, _id);

  await writtenNotes.findByIdAndUpdate(_id, user1);
  const details = await writtenNotes.findById(_id);
  res.json(details);
  console.log("ho gya ");
});
// ####edit notes ##############
router.put("/editNote", authenticateToken, async (req, res) => {
  const _id = { _id: req.body._id };
  const written = { written: req.body.written };

  console.log(written, _id);

  await writtenNotes.findByIdAndUpdate(_id, written);
  const details = await writtenNotes.findById(_id);
  res.json(details);
  console.log("ho gya ");
});

// #####################################delete###########################

router.delete("/Delete", authenticateToken, async (req, res) => {
  const _id = { _id: req.body._id };
  // const user1 = { user1: req.body.user1 };

  console.log(_id);

  await writtenNotes.findByIdAndDelete(_id);
  const details = await writtenNotes.findById(_id);
  res.sendStatus(200);
  console.log(" delete ho gya ");
});

module.exports = router;

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
