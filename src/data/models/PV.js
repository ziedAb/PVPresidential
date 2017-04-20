const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const partySchema = new Schema({
    name: String,
    number: Number,
    votes: Number
});

const PVSchema = new Schema({
    office: {
        type: Number,
        required: [true, 'office field is required']
    },
    stamped: Boolean,
    parties:[partySchema]
},
{ strict: false }
);

const PV = mongoose.model('PV', PVSchema);

module.exports = PV;
