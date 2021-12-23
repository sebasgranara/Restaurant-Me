const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  image: {
      type: String,
      default: /images/default-restaurant.png
  },
  budget: { type: String, enum: ['10-20e', '20-50e', '+50e'] },
  priority: { type: String, enum: ['Top Priority', 'Important', 'If Nothing Better To Do'] },
  openingHours: [String],
  veganMenu: { type: String, enum: ['yes', 'no'] },
  glutenFree: { type: String, enum: ['yes', 'no'] },
  neighborhood: String,
  cuisine: String,
  ambience: { type: String, enum: ['formal', 'business', "with friends", 'date'] },
  bookingUrl: String,
  menuUrl: String,
  notes: String
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;