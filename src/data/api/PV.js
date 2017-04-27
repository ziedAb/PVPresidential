const express = require ('express');
const router = express.Router();
const PV = require('../models/PV');

// add a new entry to the db
router.post('/PV', function(req, res, next){
    PV.create(req.body).then(function(test){
        res.send(test);
    }).catch(next);
});

// get entry from the db
router.get('/PV/:office', function(req, res, next){
    PV.findOne({office: req.params.office}).then(function(element){
        res.send(element);
    }).catch(next);
});

module.exports = router;
