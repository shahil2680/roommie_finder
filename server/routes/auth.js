const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(
 process.env.TWILIO_ACCOUNT_SID,
 process.env.TWILIO_AUTH_TOKEN
);

router.post("/send-otp", async (req,res)=>{

 const {mobile} = req.body;

 try{

  await client.verify.v2
   .services(process.env.TWILIO_VERIFY_SERVICE_SID)
   .verifications.create({
    to: `+91${mobile}`,
    channel: "sms"
   });

  res.json({message:"OTP sent to phone"});

 }

 catch(error){

  res.status(500).json(error);

 }

});

router.post("/verify-otp", async (req,res)=>{

 const {mobile,otp} = req.body;

 try{

  const verification = await client.verify.v2
   .services(process.env.TWILIO_VERIFY_SERVICE_SID)
   .verificationChecks.create({
    to: `+91${mobile}`,
    code: otp
   });

  if(verification.status === "approved"){

   const token = jwt.sign({mobile},"secret123",{expiresIn:"1d"});

   res.json({token});

  }
  else{

   res.status(400).json({message:"Invalid OTP"});

  }

 }

 catch(error){

  res.status(500).json(error);

 }

});

module.exports=router;