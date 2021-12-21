const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const BaseResponse = require('../services/BaseResponse')
const ErrorResponse = require('../services/ErrorResponse');
const config = require("../../config.js");

const router = express.Router();
const saltRounds = 10;

/**
 * Sign-in
 */
router.post("/signin", (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // query went through
      else {
        if (!user) {
          const errorResponse = new ErrorResponse(404, `User ${req.body.userName} was not found`, null);

          return  res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
        // User exists
        else {
          let authenticated = bcrypt.compareSync(req.body.password, user.password);

          if (authenticated) {
            console.log(`User: ${user.userName}, just signed in!`);
            // sign token
            let token = jwt.sign({
              userName: req.body.userName,
              role: user.role
            }, config.secret, { expiresIn: "24h" });

            const baseResponse = new BaseResponse(202, `Successfully signed in as ${user.userName}`, {
              auth: true,
              token: token
            });
            return res.status(baseResponse.httpCode).json(baseResponse.toObject());
          }
          // invalid password
          else {
            const errorResponse = new ErrorResponse(400, 'Invalid Password', null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          }
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});

module.exports = router;
