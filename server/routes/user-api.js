const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user")

const router = express.Router();
const saltRounds = 10;

/**
 * Creates a User TODO:
 */
router.post("/", async (req, res) => {
  // query username to see if user exists

  // else create user
});

/**
 * Gets the users budget
 */
router.get("/:userName/budget", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName}, (err, user) => {
      if (err) {
        console.log('MongoDB Error')
        console.log(err);
        res.status(500).send({
          message: 'MongoDB Error'
        })
      }
      else {
        // User exists
        if (user) {
          console.log('--User returned from API--');
          console.log(user);
          // Return user's budget
          res.json(user.budget);
        }
        // User doesn't exist
        else {
          console.log("Error - User doesn't exist")
          res.status(404).send({
            message: "User not found"
          })
        }
      }
    })
  }
  catch(e) {
    console.log('MongoDB Error')
    console.log(e);
    res.status(500).send({
      message: 'MongoDB Error'
    })
  }

});

/**
 * Update Budget
 */
router.put('/:userName/budget', function (req,res) {

  // Filter
  const filter = {
    userName : req.params.userName
  }

  // Query
  User.findOne(filter, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
        error: err
      })
    }
    // Query went through
    else {
      // If user exists
      if (user) {
        user.set({
          budget: req.body
        });
        user.save( (err, savedUser) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              error: err,
              message: "Internal Server Error"
            });
          }
          // Save successful
          else {
            // Return new budget
            console.log(savedUser);
            res.json(savedUser.budget);
          }
        })
      }
      // User not found
      else {
        res.status(404).send({
          message: "User not found"
        })
      }
    }
  })

});

module.exports = router;
