const express = require ('express');
const router = express.Router();
const Circonscription = require('../models/Circonscription');

// get a list of ninjas from the db
router.get('/getCirconscription/:circonscription', function(req, res, next){
    Circonscription.findOne({name: req.params.circonscription}).then(function(element){
      res.send(element);
    });
});

module.exports = router;
