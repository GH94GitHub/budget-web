const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/users/amount', function (req, res) {
  try {
    User.findOne({}, (err, user) => {
      if (err) { console.log(err); }
      else {
        console.log('--User returned from API--');
        console.log(user);
        res.json(user);
      }
    })
  }
  catch(e) {
    res.status(500).send({
      message: 'MongoDB Error'
    })
  }
});

router.put('/users/amount', function (req,res) {

  let update = {};

  if (req.body.amount) {
    update.amount = req.body.amount
  }

  User.findOneAndUpdate({}, update, {'new': true}, (err, user) => {
    if ( err ) { console.log(err); }
    else {
      console.log('--User Inside Amount PUT API--');
      console.log(user);

      res.json(user)
    }
  })

});

module.exports = router;
