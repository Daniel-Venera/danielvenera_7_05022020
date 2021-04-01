const axios = require("axios").default;
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("./middleware/multer-config");
const jwt = require("jsonwebtoken");
var session = require("express-session");
const bodyParser = require("body-parser");
var clean = require("xss-clean/lib/xss").clean;
var cleaned = clean("<script></script>");
var helmet = require("helmet");
const app = express();
app.use(cors());
app.use(helmet());
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
// Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.status(403).json({ erreur: "accès non autorisé" });
    }
};
//This is a protected route
app.get("/user/data", checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, "RANDOM_TOKEN_SECRET", (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log("ERROR: Could not connect to the protected route");
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data
            res.json({
                message: "Successful log in",
                authorizedData
            });
            console.log("SUCCESS: Connected to protected route");
        }
    });
});
app.post("/upload", multer, (req, res) => {
    res.json({ file: "Uploaded file" });
});
require("././routes/user.routes.js")(app);
require("././routes/post.routes.js")(app);
require("././routes/comment.routes.js")(app);
require("././routes/like.routes.js")(app);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
