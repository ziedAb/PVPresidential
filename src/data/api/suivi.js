const express = require ('express');
const router = express.Router();
const PV = require('../models/PV');


router.get('/Suivi', function(req, res, next){
    PV.find({})
    .populate({ path: 'filledBy', select: 'name' }) // only return the Persons name
    .exec(function (err, pvs) {
      if (err) return handleError(err);

      let counts = {};
      for(let i of pvs) {
        let u = i.filledBy.name;
        counts[u] = counts[u] ? counts[u]+1 : 1;
      }
      res.send(counts);
    })
});

module.exports = router;
