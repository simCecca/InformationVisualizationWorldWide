const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

//@route POST api/users
//@desc Register new user
//@access Public
router.post('/', function(req, res) {
  const { name, email, password } = req.body;

  //simple validation
  if(!name || !email || !password){
      return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email })
      .then(user => {
          if(user) res.status(400).json({ msg: "User already exists" });
          const newUser = new User({
              name,
              email,
              password
          });

          //Create salt & hash the password
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                      .then(user => {
                          //create a token; fisrst parameter is the payload that we wont to add
                          //the second is the secret, the third is the time for expire the user
                          //the fourt is a callback
                          jwt.sign(
                              { id: user.id },
                              config.get('jwtSecret'),
                              { expiresIn: 3600 },
                              (err, token) => {
                                  if(err) throw err;
                                  res.json({
                                      token,
                                      user: {
                                          id: user.id,
                                          name: user.name,
                                          email: user.email
                                      }
                                  });
                              }
                          )
                      })
              })
          })
      })
});

module.exports = router;
