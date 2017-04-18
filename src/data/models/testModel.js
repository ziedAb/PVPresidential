const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema & model
const TestSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }
});

const TestModel = mongoose.model('TestModel', TestSchema);

module.exports = TestModel;
