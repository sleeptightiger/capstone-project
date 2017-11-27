const express = require('express');
const axios = require('axios');
const morgan = require('morgan')
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3001;

// Log HTTP Requests
app.use(morgan('combined'))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});






app.get('/food', (req, res) => {
  // let query = req.params.q;
  const url = `https://trackapi.nutritionix.com/v2/search/instant?query=chicken`;
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

// app.get('/', (req, res) => {
//   // let query = req.params.q;
//   const url = 'http://api.icndb.com/jokes/random';
//   axios.get(url)
//   .then((response) => {
//     res.status(200).json(response.data);
//   })
//   .catch((err) => {
//     res.status(400).json('Error:', err);
//   })
// })













// App Start

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`App running on port ${port}`);
  }
});
