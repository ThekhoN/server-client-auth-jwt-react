// entry
const express = require('express');
const morgan = require('morgan');
const router = require('./router/router');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:auth/auth');

// app
const app = express();
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
app.use(morgan('combined'));
router(app);

// server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, function (err) {
  if(err){
    console.log('error in server:', err);
  }
  else {
    console.log('app listening on port: ', port);
  }
});
