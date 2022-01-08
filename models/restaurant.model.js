const mongoose = require('mongoose');
const config = require('../config');

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  // image: {
  //     type: String,
  //     default: /images/default-restaurant.png
  // },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  budget: { type: String, enum: config.budget }, // put in config file
  priority: { type: String, enum: ['TBE', 'Top Priority', 'Must Go', 'Maybe', 'If Nothing Better To Do'] },
  // openingHours: [String],
  // veganMenu: { type: String, enum: ['yes', 'no'] },
  // glutenFree: { type: String, enum: ['yes', 'no'] },
  neighborhood: String,
  cuisine: String,
  ambience: { type: String, enum: ['TBE', 'formal', 'casual', 'business', 'with friends', 'date', 'hip'] },
  // bookingUrl: String,
  // menuUrl: String,
  notes: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
