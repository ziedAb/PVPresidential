const express = require ('express');
const router = express.Router();
const testModel = require('../models/testModel');

// get a list of ninjas from the db
router.get('/testModel', function(req, res, next){
    testModel.find({}).then(function(elements){
      res.send(elements);
    });
});

// add a new ninja to the db
router.post('/testModel', function(req, res, next){
    testModel.create(req.body).then(function(test){
        res.send(test);
    }).catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    res.send({type: 'GET'});
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

module.exports = router;
