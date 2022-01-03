
const express = require('express');
const Restaurant = require('../models/restaurant.model');

function restaurantRoutes() {
  const router = express.Router();

  // show preview of all restaurants on home page

  router.get('/', (req, res, next) => {

    Restaurant.find()
    .then(returnedRestaurants => {
        res.render('home.hbs', { returnedRestaurants });
        console.log(returnedRestaurants);
    })
    .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  // create new restaurant

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

  // show restaurant details
  router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Restaurant.findById(id)
      .then(foundRestaurant => {
        res.render('restaurants/restaurant-details', { foundRestaurant });
      })
      .catch(error => next(error));
  });

  // delete restaurant

  router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Restaurant.findByIdAndDelete(id)
      .then(() => res.redirect('/'))
      .catch(error => console.log('Error while deleting restaurant occurred'));
  });

  // update restaurant

  router.get('/:id/update', (req, res, next) => {
    const { id } = req.params;

    Restaurant.findById(id)
      .then(restaurantToEdit => {
        res.render('restaurants/update-restaurant', { restaurantToEdit });
      })
      .catch(error => next(error));
  });

  router.post('/:id/update', (req, res, next) => {
    const { id } = req.params;
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;

    Restaurant.findByIdAndUpdate(id, { name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/'))
      .catch(error => console.log('Error while updating restaurant occurred'));
  });

  return router;
}

module.exports = restaurantRoutes;