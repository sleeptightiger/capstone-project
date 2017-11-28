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



// Headers for Nutritionix API
const headers = {
  'x-app-id': process.env.NUTRITION_APP_ID,
  'x-app-key': process.env.NUTRITION_APP_KEY,
  'x-remote-user-id': process.env.REMOTE_USER_ID
}



app.get('/instantSearch/:q', (req, res) => {
  let query = req.params.q;
  const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`;
  axios.get(url, { headers })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    res.status(400).send('Error:', err);
  })
})

app.get('/nutrients/:id', (req, res) => {
  let id = req.params.id;
  const url = `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${id}`;
  axios.get(url, { headers })
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

var chickenList = require('./json/chickenList.json');
var beefList = require('./json/groundBeefList.json');
app.get('/chickenList', (req, res) => {
  let jsonFile = []
  for (let i = 0; i < chickenList.foods.length; i++) {
    jsonFile.push(chickenList.foods[i]);
  }
  res.json(jsonFile)
}).get('/beefList', (req, res) => {
  let jsonFile = []
  for (let i = 0; i < beefList.foods.length; i++) {
    jsonFile.push(beefList.foods[i]);
  }
  res.json(jsonFile)
})







// App Start

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`App running on port ${port}`);
  }
});
