
const express = require('express');
const Restaurant = require('../models/restaurant.model');

function restaurantRoutes() {
  const router = express.Router();

  // show preview of all restaurants on home page

  router.get('/restaurants', (req, res, next) => {
    Restaurant.find()
      .then(returnedRestaurants => {
        res.render('restaurants/restaurants-home.hbs', { returnedRestaurants });
        console.log(returnedRestaurants);
      })
      .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  // create new restaurant

  router.get('/restaurants/new', (req, res, next) => {
    res.render('restaurants/new-restaurant');
  });

  router.post('/restaurants/new', (req, res, next) => {
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;
    Restaurant.create({ name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/restaurants'))
      .catch(error => {
        console.log('Error while creating restaurant occurred', error);
        res.redirect('/restaurants/new');
      });
  });

  // find restaurant (search all restaurants by criteria)

  router.get('/restaurants/find', (req, res, next) => {
    res.render('restaurants/find-restaurant');
  });

  router.post('/restaurants/find', (req, res, next) => {
    const { name } = req.body;
    // Restaurant.find({ $text: { $search: name } })
    Restaurant.find({ name: name })
          .then(foundRestaurants => {
            res.render('restaurants/restaurants-filtered.hbs', { foundRestaurants });
            console.log(foundRestaurants);
          })
          .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  // show restaurant details
  router.get('/restaurants/:id', (req, res, next) => {
    const { id } = req.params;

    Restaurant.findById(id)
      .then(foundRestaurant => {
        res.render('restaurants/restaurant-details', { foundRestaurant });
      })
      .catch(error => next(error));
  });

  // delete restaurant

  router.post('/restaurants/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Restaurant.findByIdAndDelete(id)
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log('Error while deleting restaurant occurred'));
  });

  // update restaurant

  router.get('/restaurants/:id/update', (req, res, next) => {
    const { id } = req.params;

    Restaurant.findById(id)
      .then(restaurantToEdit => {
        res.render('restaurants/update-restaurant', { restaurantToEdit });
      })
      .catch(error => next(error));
  });

  router.post('/restaurants/:id/update', (req, res, next) => {
    const { id } = req.params;
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;

    Restaurant.findByIdAndUpdate(id, { name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log('Error while updating restaurant occurred'));
  });

  return router;
}

module.exports = restaurantRoutes;