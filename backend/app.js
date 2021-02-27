require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
var session = require("express-session");
const bodyParser = require("body-parser");
var clean = require("xss-clean/lib/xss").clean;
var cleaned = clean("<script></script>");
var helmet = require("helmet");
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(helmet());
app.use(limiter);
app.use(
    session({
        secret: process.env.SESSION,
        resave: true,
        saveUninitialized: true
    })
);
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
require("././routes/user.routes.js")(app);
require("././routes/post.routes.js")(app);
require("././routes/comment.routes.js")(app);
