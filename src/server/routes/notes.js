const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const cors = require('cors');

router.use(cors());

router.post('/add-note', (req, res) => {
   let note = req.body.note;
   console.log(note)
    userModel.findOneAndUpdate({token: req.body.token}, {$push: {notes: note}}, function (error, success) {
        if (error) {
            res.send({"error": err});
        } else {
            res.send({"add": "success"})
        }
    });
    
})

router.post('/get-user-notes', (req, res) => {
    userModel.findOne({token: req.body.token}, function (err, notes) {
        if (err) {
            throw err;
        } else {
            if (notes) {
                res.json({
                    notes: notes.notes
                });
            } 
        }
    });
})

router.post('/delete-note', (req, res) => {

    userModel.findOneAndUpdate({token: req.body.token}, {$pull: {notes: {id: req.body.id}}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
    res.send({"delete": "success"})
})

router.post('/edit-note', (req, res) => {
    let note = req.body.note;
     userModel.findOneAndUpdate({token: req.body.token, 'notes.id': note.id},
      {$set: {'notes.$.description': note.description,
      'notes.$.title': note.title, 'notes.$.x': note.x, 'notes.$.y': note.y}}, function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     });
     res.send({"edit": "success"})
 })



module.exports = router;