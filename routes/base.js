const express = require('express');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      if (req.session.logged) {
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
