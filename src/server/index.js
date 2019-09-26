const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 3001;
const mongoUri = 'mongodb://localhost/react-auth';
const homeRouter = require('./routes/homepage')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(homeRouter);

mongoose.connect(mongoUri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongoUri}`);
  }
});

app.listen(port, function () {
    console.log("Express server listening on port " + port);
});