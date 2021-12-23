// routes/auth.routes.js

const { Router } = require('express');

const router = new Router();
const bcryptjs = require('bcryptjs');

const saltRounds = 10;
const User = require('../models/user.js');

// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
  // console.log("The form data: ", req.body);

  const { email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        email,
        passwordHash: hashedPassword,
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
    })
    .catch(error => next(error));
});

module.exports = router;
