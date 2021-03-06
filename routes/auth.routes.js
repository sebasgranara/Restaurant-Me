// routes/auth.routes.js

const { Router } = require('express');

const router = new Router();
const bcryptjs = require('bcryptjs');

const saltRounds = 10;
const mongoose = require('mongoose');
const User = require('../models/user');

const { isLoggedOut } = require('../middlewares/index');

// GET route ==> to display the signup form to users
router.get('/signup', isLoggedOut, (req, res) => res.render('auth/signup'));

// POST route ==> to process form data
router.post('/signup', isLoggedOut, (req, res, next) => {
  // console.log("The form data: ", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.render('auth/signup', {
      errorMessage: 'All fields are mandatory. Please provide your email and password.',
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render('auth/signup', {
      errorMessage:
        'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        name,
        email,
        hashedPassword,
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/login');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: 'Email is already used.',
        });
      } else {
        next(error);
      }
    });
});

router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login');
});

router.post('/login', isLoggedOut, async (req, res, next) => {
  const { email, pass } = req.body;

  if (email === '' || pass === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.',
    });
    return;
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        if (bcryptjs.compareSync(pass, user.hashedPassword)) {
          req.session.logged = true;
          req.session.user = user;
          console.log('Success!', user);
          res.redirect('/restaurants');
        } else {
          console.log('ERROR');
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      } else {
        res.render('auth/login', { errorMessage: 'Email is not registered.' });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});

module.exports = router;
