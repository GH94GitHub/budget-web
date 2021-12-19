const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user")

// Middleware
const isAdminUser = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();
const saltRounds = 10;

/**
 * Creates a User
 */
router.post("/", [isAdminUser], async (req, res) => {
  // query username to see if user exists
  User.findOne({ userName: req.body.userName}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Internal Server Error"
      });
    }
    // Query went through
    else {
      // user exists
      if (user) {
        console.log("User already exists");
        return res.status(400).send({
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
            return res.status(500).send({
              message: "Internal Server Error"
            });
          }
          // query went through
          else {
            console.log(`Successfully created User: ${user}.`);
            return res.status(201).json(user);
          }
        });
      }
    }
  });
});

/**
 * Get user by userName
 */
router.get("/:userName", [userAuth], async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Internal Server Error"
        });
      }
      // query went through
      else {
        // Invalid username provided
        if (!user) {
          return res.status(404).send({
            message: `User ${req.params.userName} doesn't exist.`
          });
        }
        else {
          console.log(user);
          return res.status(200).send(user);
        }
      }
    });
  }
  catch(e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

/**
 * Delete a user
 */
router.delete("/:userName", [isAdminUser], async (req, res) => {
  try {
    User.deleteOne({ userName: req.params.userName}, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Internal Server Error"
        });
      }
      else {
        // one record was deleted
        if (result.deletedCount !== 0) {
          console.log(`User: ${req.params.userName}, was DELETED.`)
          return res.status(200).send({
            message: `User: ${req.params.userName}, has successfully been deleted.`
          });
        }
        else {
          return res.status(400).send({
            message: `Username: ${req.params.userName}, is invalid.`
          })
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

/**
 * Gets the users budget
 */
router.get("/:userName/budget", [userAuth], async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName}, (err, user) => {
      if (err) {
        console.log('MongoDB Error')
        console.log(err);
        return res.status(500).send({
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
          return res.status(404).send({
            message: "User not found"
          })
        }
      }
    })
  }
  catch(e) {
    console.log('MongoDB Error')
    console.log(e);
    return res.status(500).send({
      message: 'MongoDB Error'
    })
  }

});

/**
 * Update Budget
 */
router.put('/:userName/budget', [userAuth], async (req,res) => {

  User.findOne({ userName: req.params.userName }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
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
            return res.status(500).send({
              error: err,
              message: "Internal Server Error"
            });
          }
          // Save successful
          else {
            // Return new budget
            res.status(202).json(savedUser.budget);
          }
        })
      }
      // User not found
      else {
        return res.status(404).send({
          message: "User not found"
        })
      }
    }
  })

});

module.exports = router;
