var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/users', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/users';

   // Connect to the server
   mongoClient.connect(url, function (err, db) {
      if (err) {
         console.log('Unable to connect to the Server', err);
      } else {
         // We are connected
         console.log('Connection established to', url);

         // Get the documents collection
         var collection = db.collection('photos');

         // Find all photos
         collection.find({}).toArray(function (err, result) {
            if (err) {
               res.send(err);
            } else if (result.length) {
               res.render('photos', {

                  // Pass the returned database documents to Jade
                  "photos": result
               });
            } else {
               res.send('No documents found');
            }
            //Close connection
            db.close();
         });
      }
   });
});

router.post('/users/authenticate', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/users';

   // Connect to the server
   mongoClient.connect(url, function (err, db) {
      if (err) {
         console.log('Unable to connect to the Server', err);
      } else {
         // We are connected
         console.log('Connection established to', url);

         // Get the documents collection
         var collection = db.collection('photos');

         // Find all photos
         collection.find({}).toArray(function (err, result) {
            if (err) {
               res.send(err);
            } else if (result.length) {
               res.render('photos', {

                  // Pass the returned database documents to Jade
                  "photos": result
               });
            } else {
               res.send('No documents found');
            }
            //Close connection
            db.close();
         });
      }
   });
});

module.exports = router;