require('dotenv').config();
const express = require('express');
const router = express.Router();
const UserDetail = require('../models/user');
const jwt = require('jsonwebtoken');
const store = require('store');

async function authenticateToken(req, res, next) {
  const storeToken = store.get('jwtToken');
  console.log(storeToken);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (storeToken) {
    token = storeToken;
  }

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decode.email;
    req.user = await UserDetail.findOne({ email });

    next();
  } catch (err) {
    return next(err);
  }
}

router.get('/posts', authenticateToken, async (req, res) => {
  const details = await UserDetail.find({ email: req.user.email });
  console.log(details);
  res.status(200).json(details);
});

module.exports = router;
