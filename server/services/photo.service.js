var config = require('../config.json');
var helpers = require('../helpers');
var _ = require('lodash');
var path = require('path');
var Q = require('q');
var mongo = require('mongoskin');
var mongoose = require('mongoose');
var grid = require('gridfs');
var fs = require('fs');

var conn = mongoose.connection;

var db = mongo.db(config.connectionString + '/photos', {native_parser: true});
db.bind('photos');

var gfs;

var service = {};

service.getAll = getAll;
service.getById = getById;
service.upload = upload;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll(albumId) {
   var deferred = Q.defer();

   db.photos.find({albumId: albumId})
      .sort({uploadDate: 1})
      .toArray(function (err, photos) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         // return photos (without hashed passwords)
         photos = _.map(photos, function (photo) {
            return _.omit(photo, 'hash');
         });

         deferred.resolve(photos);
      });

   return deferred.promise;
}

function getById(_id) {
   var deferred = Q.defer();

   db.photos.findById(_id, function (err, photo) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (photo) {
         deferred.resolve(photo);
      } else {
         // photo not found
         deferred.resolve();
      }
   });

   return deferred.promise;
}

function upload(photoParam, file) {
   var deferred = Q.defer();

   // validation
   db.photos.findOne(
      {filename: photoParam.filename},
      function (err, photo) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         if (photo) {
            // photoname already exists
            deferred.reject('Photo "' + photoParam.filename + '" is already taken');
         } else {
            uploadPhoto();
         }
      });

   function uploadPhoto() {
      gfs = grid(conn.db);

      photoParam = {
         _id: photoParam.albumId + '_' + photoParam.filename
      };

      var writeStream = gfs.createWriteStream(file);

      writeStream.on('close', function (file) {
         if(!file) deferred.reject('No File Uploaded!');

         return res.status(200).send({
            message: 'Success'
         });
      });

      writeStream.write(file.data, function () {
         deferred.resolve();
         writeStream.end();
      });

      /*db.photos.insert(
         photoParam,
         {w: 1, safe: true},
         function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
         });*/
   }

   return deferred.promise;
}

function update(_id, photoParam) {
   var deferred = Q.defer();

   // validation
   db.photos.findById(_id, function (err, photo) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (photo.photoname !== photoParam.photoname) {
         // photoname has changed so check if the new photoname is already taken
         db.photos.findOne(
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
         firstName: photoParam.firstName,
         lastName: photoParam.lastName,
         photoname: photoParam.photoname,
      };

      db.photos.update(
         {_id: mongo.helper.toObjectID(_id)},
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

   db.photos.remove(
      {_id: mongo.helper.toObjectID(_id)},
      function (err) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         deferred.resolve();
      });

   return deferred.promise;
}