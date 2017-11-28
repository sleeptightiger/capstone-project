const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let foodSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

let Food = mongoose.model('Food', foodSchema);


module.exports = {
  Food
};
