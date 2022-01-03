
const express = require('express');
const Restaurant = require('../models/restaurant.model');

function restaurantRoutes() {
  const router = express.Router();

  router.get('/', (req, res, next) => {

    Restaurant.find()
    .then(returnedRestaurants => {
        res.render('home.hbs', { returnedRestaurants });
        console.log(returnedRestaurants);
    })
    .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  router.get('/new', (req, res, next) => {
    res.render('restaurants/new-restaurant');
  });

  router.post('/new', (req, res, next) => {
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;
    Restaurant.create({ name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/'))
      .catch(error => {
        console.log('Error while creating restaurant occurred', error);
        res.redirect('/new');
      });
  });

  return router;
}

module.exports = restaurantRoutes;