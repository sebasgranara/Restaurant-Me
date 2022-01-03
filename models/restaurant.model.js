const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  // name: {
  //     type: String,
  //     required: true
  // },
  // image: {
  //     type: String,
  //     default: /images/default-restaurant.png
  // },
  name: String,
  budget: { type: String, enum: ['10-20e', '20-50e', '51-100e', '+100e'] },
  priority: { type: String, enum: ['Top Priority', 'Must Go', 'Maybe', 'If Nothing Better To Do'] },
  // openingHours: [String],
  // veganMenu: { type: String, enum: ['yes', 'no'] },
  // glutenFree: { type: String, enum: ['yes', 'no'] },
  neighborhood: String,
  cuisine: String,
  ambience: { type: String, enum: ['formal', 'casual', 'business', 'with friends', 'date', 'hip'] },
  // bookingUrl: String,
  // menuUrl: String,
  notes: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;