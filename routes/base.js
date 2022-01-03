const express = require('express');
const Restaurant = require('../models/restaurant.model');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      res.render('home.hbs');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
