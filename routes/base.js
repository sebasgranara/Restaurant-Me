const express = require('express');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => { // call isLoggedIn function in params
    try {
      if (req.session.logged) { // there is a middleware for that

        res.redirect('/restaurants');
        return;
      }
      res.render('home.hbs');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
