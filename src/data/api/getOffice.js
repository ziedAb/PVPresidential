const express = require ('express');
const router = express.Router();
const Office = require('../models/Office');

// get a list of ninjas from the db
router.get('/getOffice/:circonscription', function(req, res, next){
    Office.findOne({number: req.params.circonscription}).then(function(element){
      res.send(element);
    });
});

// add a new entry to the db
// router.post('/getOffice', function(req, res, next){
//     Office.create(req.body).then(function(test){
//         res.send(test);
//     }).catch(next);
// });

module.exports = router;
