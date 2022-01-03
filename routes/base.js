const express = require('express');
const Restaurant = require('../models/restaurant.model');

function baseRoutes() {
  const router = express.Router();

  // router.get('/', async (req, res, next) => {
  //   try {
  //     res.render('home.hbs', { name: 'Ironhack' }); // just an example of passing a variable to view
  //   } catch (e) {
  //     next(e);
  //   }
  // });
  router.get('/', (req, res, next) => {
    Restaurant.find()
      .then(returnedRestaurants => {
        res.render('home.hbs', { returnedRestaurants });
        console.log(returnedRestaurants);
      })
      .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  return router;
}

module.exports = baseRoutes;
