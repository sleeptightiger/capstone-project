const express = require('express');
const axios = require('axios');
const morgan = require('morgan')
const bodyParser = require('body-parser');

require('dotenv').config();


var NutritionixClient = require('nutritionix');


var nutritionix = new NutritionixClient({
    appId: process.env.NUTRITION_APP_ID,
    appKey: process.env.NUTRITION_APP_KEY
    // debug: true, // defaults to false
});


const app = express();
const port = process.env.PORT || 3001;

// Log HTTP Requests
app.use(morgan('combined'))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*',);
  next();
});







app.get('/food/:q', (req, res) => {
  let query = req.params.q;
  const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`;
  axios.get(url, {
    headers: {
      'x-app-id': process.env.NUTRITION_APP_ID,
      'x-app-key': process.env.NUTRITION_APP_KEY,
      'x-remote-user-id': process.env.REMOTE_USER_ID
    }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    res.status(400).send('Error:', err);
  })
})



app.get('/natural', (req, res) => {

  var ingredients = [
  '3 oz beef'
];

  nutritionix.natural(ingredients.join('\n'))
    .then((successHandler, errorHandler) => {
      console.log(successHandler)
      res.status(200).send(successHandler);
    })
    .catch((err) => {
      console.log(err);
    });

})







// App Start

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`App running on port ${port}`);
  }
});
