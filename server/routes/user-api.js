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

/* -------------- Budget ------------ */
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

/* -------------- Bills ------------ */
/**
 * Get bills by userName TODO: test with SOAP UI
 */
router.get('/:userName/bills', [userAuth], async (req, res) => {
  try{
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        throw new Error("Internal Server Error");
      }
      // query went through
      else {
        if (!user) {
          throw new Error("No user was found");
        }
        // user exists
        else {
          console.log(user.bills);
          return res.status(200).json(user.bills);
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    return res.status(500).send({
      error: e.error,
      message: "Internal Server Error"
    })
  }
});

/**
 * Get bill by id TODO: test with SOAPUI
 */
router.get(':userName/bills/:id', [userAuth], (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, (err, user) => {
      // MongoDB Error
      if (err) {
        console.log(err);
        throw new Error("Internal Server Error");
      }
      // Query went through
      else {
        // No user was found
        if (!user) {
          throw new Error("No user was found.");
        }
        // User found
        else {
          for(let bill of user.bills) {
            if (bill._id === req.params.id) {
              console.log(bill);
              return res.status(200).json({
                message: `Successfully retrieved Bill: ${bill.name};`,
                data: bill
              });
            }
          }

          throw new Error("No bill was found on that user.")
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    return res.status(500).send({
      message: e.message
    });
  }
});
/**
 * UPDATE bill by id TODO: test with SOAPUI
 */
router.put(':userName/bills/:id', [userAuth], (req, res) => {
  try{
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        console.log(err);
        throw new Error("Internal Server Error");
      }
      else {
        // User was not found
        if (!user) {
          throw new Error(`User: ${user.userName} was not found.`);
        }
        // User was found
        else {

          for (let [index, bill] of user.bills) {
            if (bill._id === req.params.id) {
              user.bills[index] = req.body;

            }
          }
          // Bill was not found on user
          if (!chosenBill) {
            throw new Error("Bill was not found");
          }
          // Bill was found
          else {
            console.log(chosenBill);
            user.save().then((savedUser) => {
              console.log(savedUser);
              res.status(201).json({
                message: `Successfully updated bill`,
                data: savedUser.bills
              });
            }).catch((err) => {
              console.log(err);
              throw new Error(`Failed to save user bill: ${user}.`);
            });
          }
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    return res.status(500).json({
      error: e.error,
      message: e.message
    });
  }
});
/**
 * DELETE bill by id TODO: test with SOAPUI
 */
router.delete(':userName/bills/:id', [userAuth], (req, res) => {
  try{
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        console.log(err);
        throw new Error("Internal Server Error");
      }
      // query went through
      else {
        // no user was found
        if (!user) {
          throw new Error(`User: ${req.params.userName}, was not found.`);
        }
        // user was found
        else {
          let billToDelete = user.bills.id(req.params.id);

          // bill exists
          if (billToDelete) {
            User.updateOne({ userName: req.params.userName }, {
              $pull: {
                bills: req.params.id
              }
            }, { new: 'true' }, (err, doc) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  message: `Failed to delete bill`,
                });
              }
              // query went through
              else {
                return res.status(201).json({
                  message: `Successfully deleted bill`
                });
              }
            });
          }
          // bill wasn't found on user
          else {
            throw new Error("Specified bill does not exist.");
          }
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    return res.status(500).json({
      message: e.message
    });
  }
});

/**
 * Create bill TODO: test with SOAP UI
 */
router.post('/:userName/bills', [userAuth], async (req, res) => {
  try{
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        throw new Error("Internal Server Error");
      }
      else {
        if (!user) {
          throw new Error("User was not found");
        }
        else {
          user.bills = req.body;
          user.save().then((savedUser) => {
            res.status(201).send({
              message: `Successfully added bill: ${req.body.name}.`,
              data: req.body
            });
          }).catch(err => {
            console.log(err);
            throw new Error(`Failed to save bill to user: ${user.firstName}`);
          })
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    return res.status(500).send({
      error: e.error,
      message: "Internal Server Error"
    })
  }
});

module.exports = router;
