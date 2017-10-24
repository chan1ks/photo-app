var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var uploadService = require('./upload.service');

var db = mongo.db(config.connectionString + '/photos', {native_parser: true});
db.bind('fs');

var service = {};

service.getAll = getAll;
service.getByFileName = getByFileName;
service.upload = upload;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll(req, res) {
   var deferred = Q.defer();
   return uploadService.getPhoto({
      "metadata": {"albumId": req.params.albumId}
   }, res, deferred);
}

function getByFileName(req, res) {
   var deferred = Q.defer();
   return uploadService.getPhoto({filename: req.params.filename}, res, deferred);
}

function upload(req, res) {
   var deferred = Q.defer();
   return uploadService.addFile(req, res, deferred)
}

function update(_id, photoParam) {
   var deferred = Q.defer();

   // validation
   db.fs.findById(_id, function (err, photo) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (photo.photoname !== photoParam.photoname) {
         // photoname has changed so check if the new photoname is already taken
         db.fs.findOne(
            {photoname: photoParam.photoname},
            function (err, photo) {
               if (err) deferred.reject(err.name + ': ' + err.message);

               if (photo) {
                  // photoname already exists
                  deferred.reject('Username "' + req.body.photoname + '" is already taken')
               } else {
                  updatePhoto();
               }
            });
      } else {
         updatePhoto();
      }
   });

   function updatePhoto() {
      // fields to update
      var set = {
         description: photoParam.description
      };

      db.fs.update(
         {_id: _id},
         {$set: set},
         function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
         });
   }

   return deferred.promise;
}

function _delete(_id) {
   var deferred = Q.defer();

   db.fs.remove(
      {_id: mongo.helper.toObjectID(_id)},
      function (err) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         deferred.resolve();
      });

   return deferred.promise;
}