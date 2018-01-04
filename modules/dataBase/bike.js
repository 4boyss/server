var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    bikeId: String,
    bikeStatus: String
});

var Bike = mongoose.model('bike', userSchema);

module.exports.Bike = Bike;