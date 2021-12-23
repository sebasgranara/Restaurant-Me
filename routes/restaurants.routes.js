
const express = require('express');

function restaurantRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      res.render('home.hbs', { name: 'Ironhack' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = restaurantRoutes;