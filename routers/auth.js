const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const User = require("../models/User");

// check API
// router.get("/", (req, res) => {
//   res.send("register router");
// });

//@router POST api/auth/register
//@Desc register new user
//access public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //Check username and password is required
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    //Check username is unique
    const user = await User.findOne({ username: username });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    //All good :
    //Note parametter is Object
    const hashPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_WORD_SECRET_KEY
    ).toString();
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();
    //return accessToken
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    res.status(201).json({
      succcess: true,
      message: "User has successfully registered",
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

//router Post /api/auth/login
//desc login
//access public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  try {
    //find user in database
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    //Have user in database =>check password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_WORD_SECRET_KEY
    );
    const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originPassword != password) {
      res.status(403).json({ success: false, message: "Password incorrect" });
    }
    //All good
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    res.status(200).json({
      succcess: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

module.exports = router;
