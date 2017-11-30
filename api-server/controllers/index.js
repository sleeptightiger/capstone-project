const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const NutritionixClient = require('nutritionix');


const _ = require('lodash');
const db = require('../db/connection.js');
require('dotenv').config();

const app = express();


var nutritionix = new NutritionixClient({
  appId: process.env.NUTRITION_APP_ID,
  appKey: process.env.NUTRITION_APP_KEY
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



app.get('/natural/:ingredients', (req, res) => {
  let ingredients = req.params.ingredients;
  axios({
    method: 'post',
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: {
      'x-app-id': process.env.NUTRITION_APP_ID,
      'x-app-key': process.env.NUTRITION_APP_KEY,
      'x-remote-user-id': process.env.REMOTE_USER_ID
    },
    data: {
      query: ingredients
    }
  })
  .then((data) => {
    res.send(data.data)
  })
})

var chickenList = require('../json/chickenList.json');
var beefList = require('../json/groundBeefList.json');
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



app.post('/foodList', (req, res) => {
  let getBody = req.body.data;
  var userID = req.body.userID;
  let getDayOfWeek = req.body.dayOfWeek;

  let nutrtionFacts = new db.Food({
    user: userID,
    name: getBody[0],
    dayOfWeek: getDayOfWeek,
    servingSize: getBody[1],
    unit: getBody[2],
    calories: getBody[3],
    protein: getBody[4],
    carbohydrates: getBody[5],
    fat: getBody[6]
  })

  nutrtionFacts.save().then((data) => {
    res.status(201).send(data);
  }).catch((err) => {
    res.status(400).send();
  });
})


app.get('/foodList/:id', (req, res) => {
  var userId = req.params.id;

  let dayOfWeek = new Date();
  dayOfWeek = dayOfWeek.getDay();
  db.Food.find({
    user: userId,
    dayOfWeek
  }).then((data) => {
    if(!data) {
      res.status(500).send();
    }
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send();
  });
});

app.get('/foodList/:id/:day', (req, res) => {
  var userId = req.params.id;
  var dayOfWeek = req.params.day;
  // let dayOfWeek = new Date();
  // dayOfWeek = dayOfWeek.getDay();
  db.Food.find({
    user: userId,
    dayOfWeek
  }).then((data) => {
    if(!data) {
      res.status(500).send();
    }
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send();
  });
});




app.get('/twilio/:num', (req, res) => {
  var accountSid = process.env.TWILIO_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: 'Matt\'s Nutrition App, you will get fitness news from here on out. If you want to opt-out please reply STOP',
      to: req.params.num,
      from: process.env.TWILIO_NUMBER,
      mediaUrl: 'https://media.giphy.com/media/l2JhB4Sp6hz37lU1W/giphy.gif'
  })
  .then((message) => console.log(message.sid));
  res.send('I think it worked?');

})


app.get('/deleteItem/:id/:name', (req, res) => {
  let id = req.params.id;
  let name = req.params.name;

  db.Food.findOneAndRemove({
    '_id': id,
    'name': name
  })
  .then((res) => {
    res.json(res);
  })
  .catch((err) => {
    new Error('Error Deleting item', err);
  })
})















module.exports = app;
