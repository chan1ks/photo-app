var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/photos';

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

router.post('/add-photo', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/test';

   // Connect to the server
   mongoClient.connect(url, function (err, db) {
      if (err) {
         console.log('Unable to connect to the Server:', err);
      } else {
         console.log('Connected to Server');

         // Get the documents collection
         var collection = db.collection('photos');

         // Get the student data passed from the form
         var student1 = {
            student: req.body.student,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            sex: req.body.sex,
            gpa: req.body.gpa
         };

         // Insert the student data into the database
         collection.insert([student1], function (err, result) {
            if (err) {
               console.log(err);
            } else {

               // Redirect to the updated student list
               res.redirect("the-list");
            }

            // Close the database
            db.close();
         });

      }
   });
});

router.post('/update-photo', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/test';

   // Connect to the server
   mongoClient.connect(url, function (err, db) {
      if (err) {
         console.log('Unable to connect to the Server:', err);
      } else {
         console.log('Connected to Server');

         // Get the documents collection
         var collection = db.collection('photos');

         // Get the student data passed from the form
         var student1 = {
            student: req.body.student,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            sex: req.body.sex,
            gpa: req.body.gpa
         };

         // Insert the student data into the database
         collection.insert([student1], function (err, result) {
            if (err) {
               console.log(err);
            } else {

               // Redirect to the updated student list
               res.redirect("the-list");
            }

            // Close the database
            db.close();
         });

      }
   });
});

router.delete('/delete-photo', function (req, res) {

   // Get a Mongo client to work with the Mongo server
   var mongoClient = mongodb.MongoClient;

   // Define where the MongoDB server is
   var url = 'mongodb://localhost:27017/test';

   // Connect to the server
   mongoClient.connect(url, function (err, db) {
      if (err) {
         console.log('Unable to connect to the Server:', err);
      } else {
         console.log('Connected to Server');

         // Get the documents collection
         var collection = db.collection('photos');

         // Get the student data passed from the form
         var student1 = {
            student: req.body.student,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            sex: req.body.sex,
            gpa: req.body.gpa
         };

         // Insert the student data into the database
         collection.insert([student1], function (err, result) {
            if (err) {
               console.log(err);
            } else {

               // Redirect to the updated student list
               res.redirect("the-list");
            }

            // Close the database
            db.close();
         });

      }
   });
});

module.exports = router;