const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user")

const BaseResponse = require("../services/BaseResponse")
const ErrorResponse = require("../services/ErrorResponse")

// Middleware
const isAdminUser = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();
const saltRounds = 10;

/**
 * Creates a User (Admin)
 */
router.post("/", [isAdminUser], async (req, res) => {
  // query username to see if user exists
  User.findOne({ userName: req.body.userName}, (err, user) => {
    if (err) {
      console.log(err);
      const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
      return res.status(errorResponse.httpCode).json(errorResponse.toObject());
    }
    // Query went through
    else {
      // user exists
      if (user) {
        const errorResponse = new ErrorResponse(500, 'User already exists', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
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
            const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          }
          // query went through
          else {
            console.log(`Successfully created user ${user}`);
            const baseResponse = new ErrorResponse(201, `Successfully created user ${user}`, null);
            return res.status(baseResponse.httpCode).json(baseResponse.toObject());
          }
        });
      }
    }
  });
});

/**
 * Get user
 */
 router.get("/", async (req, res) => {
  try {
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        // Invalid username
        if (!user) {
          const errorResponse = new ErrorResponse(404, `The username ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // Found their user
        else {
          console.log(user);
          const baseResponse = new BaseResponse(200, `Successfully retrieved user ${localUser.userName}`, user);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        }
      }
    });
  }
  catch(e) {
    console.log(e.message);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});



/**
 * Delete user
 */
 router.delete("/", async (req, res) => {
  try {
    const localUser = req.app.locals.user;
    User.deleteOne({ userName: localUser.userName}, (err, result) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      else {
        // Record was deleted
        if (result.deletedCount !== 0) {
          console.log(`User ${localUser.userName} was DELETED`)

          const baseResponse = new BaseResponse(200, `The user ${localUser.userName} has successfully been deleted`, null);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        }
        else {
          const errorResponse = new ErrorResponse(400, `The username ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});

/* -------------- Budget ------------ */
/**
 * Gets the users budget
 */
router.get("/budget", async (req, res) => {
  try {
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName}, (err, user) => {
      if (err) {
        console.log(err);

        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      else {
        // User exists
        if (user) {
          const baseResponse = new BaseResponse(200, "Successfully retrieved budget", user.budget);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        // User doesn't exist
        }
        else {
          const errorResponse = new ErrorResponse(404, `The user cannot be found`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});

/**
 * Update Budget
 */
router.put('/budget', async ( req, res ) => {
  try {
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
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
              const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
              return res.status(errorResponse.httpCode).json(errorResponse.toObject());
            }
            // Save successful
            else {
              // Return new budget
              const baseResponse = new BaseResponse(202, "Successfully saved your budget", savedUser.budget);
              return res.status(baseResponse.httpCode).json(baseResponse.toObject());
            }
          })
        }
        // User not found
        else {
          const errorResponse = new ErrorResponse(404, `User ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }

});

/* -------------- Bills ------------ */
/**
 * Get bills
 */
router.get('/bills', async (req, res) => {
  try{
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        // User doesn't exist
        if (!user) {
          const errorResponse = new ErrorResponse(404, `User ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // User exists
        else {
          const baseResponse = new BaseResponse(200, 'Successfully retrieved your bills', user.bills);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
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

/**
 * Update bills
 */
router.put('/bills', async (req, res) => {
  try {
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName}, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        if (user) {
          user.bills = req.body;
          // Save user
          user.save().then((result) => {
            console.log(result);
            const baseResponse = new BaseResponse(201, "Successfully updated bills", user.bills);
            return res.status(baseResponse.httpCode).json(baseResponse.toObject());
          }).catch((err) => {
            console.log(err);
            const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          })
        }
        // User wasn't found
        else {
          const errorResponse = new ErrorResponse(404, `The user ${localUser.userName} was not found`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
})

/**
 * Create bill
 */
 router.post('/bills', async (req, res) => {
  try{
    const localUser = req.app.locals.user;
    User.findOneAndUpdate({ userName: localUser.userName }, {
      $push: {
        bills: req.body
      }
    }, { new: true }, (err, updatedUser) => {
      if (err) {
        const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        if (updatedUser) {
          const i = updatedUser.bills.length - 1;
          const bill = updatedUser.bills[i];
          console.log(updatedUser.bills);
          const baseResponse = new BaseResponse(201, "Successfully created bill", bill);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        }
        // Failed to create bill
        else {
          const errorResponse = new ErrorResponse(401, "Failed to create bill", null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());

        }
      }
    });
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});
/**
 * Get bill by id
 */
router.get('/bills/:id', async (req, res) => {
  try {
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      // MongoDB Error
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        // No user was found
        if (!user) {
          const errorResponse = new ErrorResponse(404, `The username ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // User found
        else {
          const bill = user.bills.id(req.params.id);
          // If a matching bill was found
          if (bill) {
            const baseResponse = new ErrorResponse(200, "Successfully retrieved bill", bill);
            return res.status(baseResponse.httpCode).json(baseResponse.toObject());
          }
          // Bill was not found
          else {
            const errorResponse = new ErrorResponse(404, "The bill was not found", null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          }
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});
/**
 * UPDATE bill by id
 */
router.put('/bills/:id', async (req, res) => {
  try{
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, "Internal Server Error");
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        if (!user) {
          const errorResponse = new ErrorResponse(404, `The user ${localUser.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // User was found
        else {
          // Get specified bill
          let bill = user.bills.id(req.params.id);
          let billChanged = false;
          // Bill doesn't exist
          if (!bill) {
            const errorResponse = new ErrorResponse(404, "The specified bill doesn't exist", null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          }
          // Update the bill if user provided information for it
          for(let key of Object.keys(req.body)) {
            if (key in bill) {
              bill[key] = req.body[key];
              billChanged = true;
            }
          }
          if (billChanged) {
            user.save().then( (user) => {
              const baseResponse = new BaseResponse(200, "Successfully updated bill", bill);
              return res.status(baseResponse.httpCode).json(baseResponse.toObject());
            }).catch( (err) => {
              console.log(err);
              const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
              return res.status(errorResponse.httpCode).json(errorResponse.toObject());
            })
          }
          // Bill wasn't changed
          else {
            const baseResponse = new BaseResponse(200, "Bill wasn't changed", bill);
            return res.status(baseResponse.httpCode).json(baseResponse.toObject());
          }
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});
/**
 * DELETE bill by id
 */
router.delete('/bills/:id', async (req, res) => {
  try{
    const localUser = req.app.locals.user;
    User.findOne({ userName: localUser.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        // No user was found
        if (!user) {
          const errorResponse = new ErrorResponse(404, `User: ${localUser.userName}, was not found.`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // User was found
        else {
          let billToDelete = user.bills.id(req.params.id);

          console.log("-------- Bill to delete -------")
          console.log(billToDelete);
          // Bill exists
          if (billToDelete) {
            User.updateOne({ userName: localUser.userName }, {
              $pull: {
                bills: billToDelete
              }
            }, { new: 'true' }, (err, doc) => {
              // Query Error
              if (err) {
                console.log(err);
                const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
                return res.status(errorResponse.httpCode).json(errorResponse.toObject());
              }
              // Query went through
              else {
                // Document was updated
                if (doc.nModified > 0) {
                  const baseResponse = new BaseResponse(201, "Successfully deleted bill", doc);
                  return res.status(baseResponse.httpCode).json(baseResponse.toObject());
                }
                // Nothing was updated
                else {
                  const baseResponse = new BaseResponse(200, "Nothing was updated", null);
                  return res.status(baseResponse.httpCode).json(baseResponse.toObject());
                }
              }
            });
          }
          // Bill wasn't found on user
          else {
            const errorResponse = new ErrorResponse(404, "The Specified bill doesn't exist", null);
            return res.status(errorResponse.httpCode).json(errorResponse.toObject());
          }
        }
      }
    });
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});

/**
 * Get user by userName (Admin)
 */
 router.get("/:userName", [isAdminUser], async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      // Query went through
      else {
        // Invalid username
        if (!user) {
          const errorResponse = new ErrorResponse(404, `The username ${req.params.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
        // Found their user
        else {
          console.log(user);
          const baseResponse = new BaseResponse(200, `Successfully retrieved user ${req.params.userName}`, user);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        }
      }
    });
  }
  catch(e) {
    console.log(e.message);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});

/**
 * Delete a user by userName (Admin)
 */
 router.delete("/:userName", [isAdminUser], async (req, res) => {
  try {
    User.deleteOne({ userName: req.params.userName}, (err, result) => {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
        return res.status(errorResponse.httpCode).json(errorResponse.toObject());
      }
      else {
        // Record was deleted
        if (result.deletedCount !== 0) {
          console.log(`User ${req.params.userName} was DELETED`)

          const baseResponse = new BaseResponse(200, `The user ${req.params.userName} has successfully been deleted`, null);
          return res.status(baseResponse.httpCode).json(baseResponse.toObject());
        }
        else {
          const errorResponse = new ErrorResponse(400, `The username ${req.params.userName} doesn't exist`, null);
          return res.status(errorResponse.httpCode).json(errorResponse.toObject());
        }
      }
    })
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, 'Internal Server Error', null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
});
module.exports = router;
