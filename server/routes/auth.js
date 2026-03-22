const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Twilio bypassed for local dev — OTP always "approved" with code 123456
router.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  console.log(`[DEV] OTP requested for mobile: ${mobile}. Use code: 123456`);
  res.json({ message: "OTP sent to phone (DEV MODE: use 123456)" });
});

router.post("/verify-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  if (otp === "123456") {
    const token = jwt.sign({ mobile }, "secret123", { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

module.exports = router;