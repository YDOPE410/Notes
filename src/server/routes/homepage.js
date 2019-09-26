const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/react-auth';
const userModel = require('../models/User')

router.post('/email-exist', (req, res) => {
    userModel.find({ email: req.body.email }, (err, data) => {
        if (err) throw err;
    }).then(dbres => {
        res.json({ "exists": dbres.length > 0 });
    })
})

router.post('/register', (req, res) => {
    new userModel(req.body).save(function (err) {
        if (err) throw err;
        res.json({"register": "success"});
    });
})

router.post('/delete', (req, res) => {
    userModel.deleteMany({} ,function (err,data) {
        if (err) throw err;
        res.json(data);
    });
})

module.exports = router;
//login