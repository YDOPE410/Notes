const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';

router.use(cors());

router.post('/email-exist', (req, res) => {

    userModel.find({ email: req.body.email }, (err, data) => {
        if (err) throw err;
    }).then(dbres => {
        res.json({ "exists": dbres.length > 0 });
    })
})

router.post('/register', (req, res) => {
    let user = req.body;
    user.token = jwt.sign(user, secretKey);
    new userModel(user).save(function (err) {
        if (err) throw err;
        res.json({ "register": "success" });
    });
})

router.post('/authenticate', (req, res) => {
    userModel.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            throw err;
        } else {
            if (user) {
                res.json({
                    token: user.token
                });
            } else {
                res.status(400).json({
                    error: "Incorrect email/password"
                });
            }
        }
    });
});

router.post('/all', (req, res) => {
    userModel.find({}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
})


router.post('/delete', (req, res) => {
    userModel.deleteMany({}, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
})

router.post('/check-token', (req, res) => {
    userModel.find({token: req.body.token}, function (err, data) {
        if (err) throw err;
        
        res.json(data);
    });
})



module.exports = router;
