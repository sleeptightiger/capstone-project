const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;


const index = require('./models/index.js');

// Log HTTP Requests
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*',);
  next();
});

// Every path will start with /api
app.use('/api', index);



// App Start

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`App running on port ${port}`);
  }
});
