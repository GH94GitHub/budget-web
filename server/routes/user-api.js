const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user")

const router = express.Router();
const saltRounds = 10;

/**
 * Creates a User
 */
router.post("/", async (req, res) => {
  // query username to see if user exists
  User.findOne({ userName: req.body.userName}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
    // Query went through
    else {
      // user exists
      if (user) {
        console.log("User already exists");
        res.status(400).send({
          message: "User already exists"
        });
      }
      else {
        // New user
        let newUser = {
          firstName: req.body.firstName || "",
          lastName: req.body.lastName || "",
          userName: req.body.userName,
          password: bcrypt.hashSync(req.body.password, saltRounds),
          bills: req.body.bills || [],
          budget: req.body.budget || {}
        }

        User.create(newUser, (err, user) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Internal Server Error"
            });
          }
          // query went through
          else {
            console.log(`Successfully created User: ${user}.`);
            res.status(201).json(user);
          }
        });
      }
    }
  });
});

/**
 * Get user by userName
 */
router.get("/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal Server Error"
        });
      }
      // query went through
      else {
        // Invalid username provided
        if (!user) {
          res.status(404).send({
            message: `User ${req.params.userName} doesn't exist.`
          });
        }
        else {
          console.log(user);
          res.status(200).json(user);
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

/**
 * Delete a user
 */
router.delete("/:userName", async (req, res) => {
  User.deleteOne({ userName: req.params.userName}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
    else {
      res.status(200).send({
        message: `User ${req.params.userName} was successfully deleted`
      });
    }
  })
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
router.put('/budget', function (req,res) {

  // Filter
  const filter = {
    userName : req.body.userName
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
