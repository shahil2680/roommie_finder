const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/create-profile",(req,res)=>{

 const data = req.body;

 const checkQuery = "SELECT * FROM users WHERE mobile=?";

 db.query(checkQuery,[data.mobile],(err,result)=>{

  if(result.length > 0){

   return res.json({
    message:"Profile already exists"
   });

  }

  const insertQuery = "INSERT INTO users SET ?";

  db.query(insertQuery,data,(err)=>{

   if(err) return res.status(500).json(err);

   res.json({message:"Profile created successfully"});

  });

 });

});

module.exports = router;