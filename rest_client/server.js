const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const usersPath = './users.json';
const http = require('http');
let fs = require('fs');
let users = { 'users': [] };
const jwt = require('jsonwebtoken');


fs.access(usersPath, fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    fs.writeFile(usersPath, JSON.stringify(users), err => {
      if (err)
        console.error(err);
    });
    console.log(`created ${usersPath}`)
    return;
  }
  fs.readFile(usersPath, 'utf-8', (err, jsonString) => {
    if (err) {
      console.log('Error reading file from disk:', err);
      return
    }
    try {
      users = JSON.parse(jsonString);
    } catch (err) {
      console.log('Error parsing JSON string:', err);
    }
  })

})

const getUserCred = (email) => {
  return users.users.find(e => e.email === email);
}

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

// app.post('/login', (req, res) => {

// })

app.post('/login', (req, res) => {
  body = JSON.parse(req.headers.body);
  let user = getUserCred(body.email);
  let isPasswordMath = body.password === user.password;
  if (isPasswordMath) {
    res.status(200).send(`Login by ${user.email}`);
  }
  else {
    res.status(400).send('Incorrect password');
  }
})



app.post('/registration', (req, res) => {
  try {
    body = JSON.parse(req.headers.body);
    body.id = uuidv1();
    users.users.push(body);
    fs.writeFile(usersPath, JSON.stringify(users), err => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send();
    console.log(`new user ${JSON.stringify(body)}`)
  } catch (error) {
    res.status(400).send(error);
  }


})

app.get('/email-exists', (req, res) => {
  if (!users.users.length) {
    res.status(200).send();
    return;
  }
  let exists = users.users.some(user => user.email === req.query.email);
  console.log('get /email-exist: ')
  console.log(`params: ${JSON.stringify(req.query)}`);
  console.log(`result = ${exists}`);
  if (exists) {
    res.status(400).send();
  }
  else {
    res.status(200).send();
  }

})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});

console.log(`connect to ${port}`)
app.listen(port);