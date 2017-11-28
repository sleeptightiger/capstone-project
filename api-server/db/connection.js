const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;


mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_MONGO_URI_LOCAL, {
  useMongoClient: true
}, (err, conn) => {
    if (err) {
        console.log('Error connecting to Mongo DB.', err);
    }
    else {
        console.log('Mongoose successfully connected to Mongo DB.');
    }
});



const Food = require('../models/food.js');


module.exports = {
  Food: Food.Food
}
