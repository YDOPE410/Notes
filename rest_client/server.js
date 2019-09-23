const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-auth';
const cors = require('cors');

const emails = ['asd@gmail.com', 'asd2@gmail.com', 'asd3@gmail.com', 'asd4@gmail.com']

app.use(cors());

mongoose.connect(mongo_uri, function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  });
app.use(express.static(path.join(__dirname, 'build')));

app.post('/registration', async (req, res) => {
  try {
    
    res.status(200).send("");
  } catch (error) {
    res.status(400).send(error);
  }
})

app.get('/email-exists', (req, res)=>{
  let exists = emails.includes(req.query.email);
  console.log('get /email-exist: ')
  console.log(`params: ${JSON.stringify(req.query)}`);
  console.log(`result = ${exists}`);
  if (exists) {
    res.status(400).send(emails.includes(req.query.email));
  }
  else {
    res.status(200).send(emails.includes(req.query.email));
  }

})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});

console.log(`connect to ${port}`)
app.listen(port);