var express = require('express');
var router = express.Router();
var Bike = require('../modules/dataBase/bikes');

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

/* For Updated user */ //Status
router.put('/', function(req, res, next) {

  var UserData;
  
  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }
    var db = client.db('sample-db');
    db.collection('TestUser').update({Id:req.body.Id}, 
                                     {Id:req.body.Id, Status:req.body.Status}, 
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
    db.collection('TestUser').findAndRemove({Id:req.body.Id}, function(err, UserData){
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

router.get('/:bikename', function(req, res, next) {

  var UserData;

  MongoClient.connect(urlMlab, function(err, client) {
    if(err) {
      res.send('Unknow Error!!');
    }

    var db = client.db('sample-db');
    db.collection('TestUser').findOne({Id:req.param.bikename}, function(err, UserData){

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
    db.collection('TestUser').insert({Id:req.body.Id, Status:req.body.Status})
    res.send('register successful!');
  });
});


module.exports = router;
