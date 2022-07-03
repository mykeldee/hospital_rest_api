const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require("express");
const app = express();

// get config vars
dotenv.config();

tkv = process.env.ACCESS_TOKEN_SECRET
function validateToken(req, res, next) {
    //get token from request header
    let token;
    const authHeader = req.headers["authorization"]
    if (typeof authHeader === 'string') {
        token = authHeader.split(" ")[1];
        jwt.verify(token, tkv, (err, user) => {
            if (err) { 
            res.status(403).send("Token invalid")
            } else {
            req.user = user
            next();
            }
        })
      } else {
        res.status(400).send("Token not present")
      }
};
     
    module.exports = validateToken;
