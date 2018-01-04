var mongoose = require('mongoose');

var bikeSchema = mongoose.Schema({

    Id: String,
    Status: String
});

var Bike = mongoose.model('bikes', bikeSchema);

module.exports.Bike = Bike;