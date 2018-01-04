var express = require('express');
var router = express.Router();
var Bike = require('../modules/dataBase/bike');

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
var urlMlab = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_URL


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Get error');
    }
    res.send('hello');
  });
});

/* For Updated user */ //bikeStatus
router.put('/', function(req, res, next) {

  var UserData;
  
  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }
    var db = client.db('sample-db');
    db.collection('TestUser').update({bikeId:req.body.bikeId}, 
                                     {bikeId:req.body.bikeId, bikeStatus:req.body.bikeStatus}, 
                                     function(err, UserData) {

      if(UserData === null) {
        res.send('Updated Error!');
      }
      res.send('Updated successful!');
      });
  });
});

/* For Delete user */
router.delete('/', function(req, res, next) {

  var UserData;

  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }
    var db = client.db('sample-db');
    db.collection('TestUser').findAndRemove({bikeId:req.body.bikeId}, function(err, UserData){
      if(!UserData) {
        res.send('Deleted Error!');
        console.log('Deleted Error!');
      }
      res.send('Deleted successful!');
      console.log(UserData);
    });
  });
});

/* For Read User */

router.post('/', function(req, res, next) {

  var UserData;

  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }

    var db = client.db('sample-db');
    db.collection('TestUser').findOne({bikeId:req.body.bikeId}, function(err, UserData){

      if(!UserData) {
        res.send('Read Error!');
        console.log('Read Error!');
      }

      res.send('Read successful!');
      console.log(UserData);
    });
  });
});

/* For user registration. */
router.post('/', function(req, res, next) {

  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }
    // New user
    var db = client.db('sample-db');
    db.collection('TestUser').insert({bikeId:req.body.bikeId, bikeStatus:req.body.bikeStatus})
    res.send('register successful!');
  });
});


module.exports = router;
