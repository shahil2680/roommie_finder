const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:location/:budget/:mother_tongue/:region/:occupation/:age", (req,res)=>{

 const {location,budget,mother_tongue,region,occupation,age} = req.params;

 const query = "SELECT * FROM users";

 db.query(query,(err,users)=>{

  if(err) return res.status(500).json(err);

  const matches = users.map(user => {

   let score = 0;

   if(user.preferred_location === location)
    score += 30;

   if(Math.abs(user.budget - budget) <= 2000)
    score += 20;

   if(user.mother_tongue === mother_tongue)
    score += 20;

   if(user.region === region)
    score += 10;

   if(user.occupation === occupation)
    score += 10;

   if(Math.abs(user.age - age) <= 3)
    score += 10;

   return {
    ...user,
    matchScore: score
   };

  });

  const sortedMatches = matches.sort(
   (a,b)=> b.matchScore - a.matchScore
  );

  res.json(sortedMatches);

 });

});

module.exports = router;