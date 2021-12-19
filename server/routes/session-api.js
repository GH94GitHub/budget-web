const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
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
        res.status(500).send({
          message: "Internal Server Error"
        });
      }
      // query went through
      else {
        if (!user) {
          res.status(404).send({
            message: `The userName ${req.body.userName} doesn't exist.`
          });
        }
        // User exists
        else {

          let authenticated = bcrypt.compareSync(req.body.password, user.password);

          if (authenticated) {
            // sign token
            let token = jwt.sign({
              userName: req.body.userName,
              role: user.role
            }, config.secret, { expiresIn: "24h" });
            res.status(200).send({
              message: "Successfully signed in",
              auth: true,
              token: token
            });
          }
          // invalid password
          else {
            res.status(400).send({
              message: "Invalid Password"
            });
          }
        }
      }
    });
  }
  catch(e) {
    console.log(e.message);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
