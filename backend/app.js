//express-rate-limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
//express
const express = require('express');
const app = express();
/////USE///////
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
//express-rate-limit
app.use(limiter);
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});
module.exports = app;