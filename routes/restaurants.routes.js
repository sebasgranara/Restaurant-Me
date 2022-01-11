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
      .catch(error => next(error));
  });

  // create new restaurant

  router.get('/new', (req, res, next) => {
    res.render('restaurants/new-restaurant', { neighborhood: config.neighborhood, cuisine: config.cuisine, budget: config.budget, priority: config.priority, ambience: config.ambience, veganMenu: config.veganMenu, glutenFree: config.glutenFree});
  });

  router.post('/new', (req, res, next) => {
    const { name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree } = req.body;
    const userId = req.session.user._id;
    // async await
    Restaurant.create({ userId, name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree })
      .then(() => res.redirect('/restaurants'))
      .catch(error => next(error));
  });

  // find restaurant (search all restaurants by criteria)

  router.get('/find', (req, res, next) => {
    res.render('restaurants/find-restaurant', {neighborhood: config.neighborhood, cuisine: config.cuisine, budget: config.budget, priority: config.priority, ambience: config.ambience, veganMenu: config.veganMenu, glutenFree: config.glutenFree});
  });

  router.post('/find', (req, res, next) => {
    const { name, neighborhood, cuisine, priority, budget, ambience, veganMenu, glutenFree } = req.body;
    const userId = req.session.user._id;

    const query = { userId };
    if (name) {
      query.name = name;
    }
    if (neighborhood) {
      query.neighborhood = neighborhood;
    }
    if (cuisine) {
      query.cuisine = cuisine;
    }
    if (priority) {
      query.priority = priority;
    }
    if (budget) {
      query.budget = budget;
    }
    if (ambience) {
      query.ambience = ambience;
    }
    if (veganMenu) {
      query.veganMenu = veganMenu;
    }
    if (glutenFree) {
      query.glutenFree = glutenFree;
    }
    Restaurant.find(query).collation({locale:'en',strength: 2}).sort({name:1})
      .then(foundRestaurants => {
        res.render('restaurants/restaurants-filtered.hbs', { foundRestaurants });
        console.log(foundRestaurants);
      })
      .catch(error => next(error));
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
      .catch(error => next(error));
  });

  // update restaurant

  router.get('/:id/update', (req, res, next) => {
    const { id } = req.params; // check id

    Restaurant.findById(id)
      .then(restaurantToEdit => {
        res.render('restaurants/update-restaurant', { restaurantToEdit, neighborhood: config.neighborhood, cuisine: config.cuisine, budget: config.budget, priority: config.priority, ambience: config.ambience, veganMenu: config.veganMenu, glutenFree: config.glutenFree });
      })
      .catch(error => next(error));
  });

  router.post('/:id/update', (req, res, next) => {
    const { id } = req.params; // check id
    const { name, neighborhood, cuisine, budget, ambience, priority, veganMenu, glutenFree, notes } = req.body;

    Restaurant.findByIdAndUpdate(id, { name, neighborhood, cuisine, budget, ambience, priority, veganMenu, glutenFree, notes })
      .then(() => res.redirect('/restaurants'))
      .catch(error => next(error));
  });

  return router;
}

module.exports = restaurantRoutes;
