const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  servingSize: Number,
  unit: String,
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number
});

let Food = mongoose.model('Food', foodSchema);


module.exports = {
  Food
};
