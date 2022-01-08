const express = require('express');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user');
const config = require('../config');

function restaurantRoutes() {
  const router = express.Router();

  // show preview of all restaurants on home page with alpha case insensitive sorting

  router.get('/', (req, res, next) => {
    // async await
    const userId = req.session.user._id;
    const currentUser = req.session.user;
    Restaurant.find({ userId })
      .collation({ locale: 'en', strength: 2 })
      .sort({ name: 1 })
      .then(returnedRestaurants => {
        res.render('restaurants/restaurants-home.hbs', { returnedRestaurants, currentUser });
        console.log(returnedRestaurants);
      })
      .catch(error => console.log('Error while finding restaurants occurred', error)); // send to eeror view
  });

  // create new restaurant

  router.get('/new', (req, res, next) => {

    res.render('restaurants/new-restaurant', { budget: config.budget});
  });

  router.post('/new', (req, res, next) => {
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;
    const userId = req.session.user._id;
    // async await
    Restaurant.create({ userId, name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/restaurants'))
      .catch(error => {
        console.log('Error while creating restaurant occurred', error);
        res.redirect('/restaurants/new'); //send to error view not redirect
      });
  });

  // find restaurant (search all restaurants by criteria)

  router.get('/find', (req, res, next) => {
    res.render('restaurants/find-restaurant');
  });

  router.post('/find', (req, res, next) => {
    const { name, neighborhood, cuisine, priority, budget, ambience } = req.body;
    // Restaurant.find({ $text: { $search: name } })
    // const query = {};
    // if (name) {
    //   query.name = name;
    // }
    // if ( neighborhood ) {
    //   query.neighborhood = neighborhood
    // }

    Restaurant.find({ $or: [{ name: name }, { neighborhood: neighborhood }, { cuisine: cuisine }, { priority: priority }, { budget: budget }, {ambience: ambience}] }).collation({locale:'en',strength: 2}).sort({name:1})
      .then(foundRestaurants => {
        res.render('restaurants/restaurants-filtered.hbs', { foundRestaurants /* , budget: config.budget */ });
        console.log(foundRestaurants);
      })
      .catch(error => console.log('Error while finding restaurants occurred', error));
  });

  // show restaurant details
  router.get('/:id', (req, res, next) => {
    const { id } = req.params; // check if id is correct

    Restaurant.findById(id)
      .then(foundRestaurant => {
        res.render('restaurants/restaurant-details', { foundRestaurant });
      })
      .catch(error => next(error));
  });

  // delete restaurant

  router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params; // check if id is correct
    Restaurant.findByIdAndDelete(id)
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log('Error while deleting restaurant occurred')); // send to error middleware
  });

  // update restaurant

  router.get('/:id/update', (req, res, next) => {
    const { id } = req.params; // check id

    Restaurant.findById(id)
      .then(restaurantToEdit => {
        res.render('restaurants/update-restaurant', { restaurantToEdit });
      })
      .catch(error => next(error));
  });

  router.post('/:id/update', (req, res, next) => {
    const { id } = req.params; // check id
    const { name, neighborhood, cuisine, budget, ambience, priority, notes } = req.body;

    Restaurant.findByIdAndUpdate(id, { name, neighborhood, cuisine, budget, ambience, priority, notes })
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log('Error while updating restaurant occurred', error));
  });

  return router;
}

module.exports = restaurantRoutes;
