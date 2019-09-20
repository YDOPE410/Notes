const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-auth';
const cors = require('cors');
app.use(cors());
mongoose.connect(mongo_uri, function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  });
app.use(express.static(path.join(__dirname, 'build')));

app.get('/get-login-data', function(req, res) {
    res.send('Welcome!');
  });

  app.get('/reg', function(req, res) {
    res.send("hi")
  });


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});

console.log(`connect to ${port}`)
app.listen(port);