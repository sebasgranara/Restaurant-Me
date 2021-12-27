// routes/auth.routes.js

const { Router } = require('express');

const router = new Router();
const bcryptjs = require('bcryptjs');

const saltRounds = 10;
const User = require('../models/user');

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
        hashedPassword,
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/login');
    })
    .catch(error => next(error));
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', async (req, res, next) => {
  const { email, pass } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user) {
    const result = await bcryptjs.compare(pass, user.hashedPassword);
    if (result) {
      req.session.logged = true;
      req.session.user = user;
      console.log('Success!', user);
      res.redirect('/restaurants');
    } else {
      console.log('ERROR');
      res.redirect('/login');
    }
  }
});

module.exports = router;
