const mongoose = require('mongoose');
const config = require('../config');

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  image: {
    type: String,
    default: '/images/restaurant/default-restaurant.png',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  budget: { type: String, enum: config.budget },
  priority: { type: String, enum: config.priority },
  neighborhood: { type: String, enum: config.neighborhood },
  cuisine: { type: String, enum: config.cuisine },
  ambience: { type: String, enum: config.ambience },
  veganMenu: { type: String, enum: config.veganMenu },
  glutenFree: { type: String, enum: config.glutenFree },
  notes: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
