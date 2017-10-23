var config = require('../config.json');
var _ = require('lodash');
var fs = require('fs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString + '/albums', {native_parser: true});
db.bind('albums');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
   var deferred = Q.defer();

   db.albums.find().toArray(function (err, albums) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      // return users (without hashed passwords)
      albums = _.map(albums, function (album) {
         return _.omit(album, 'hash');
      });

      deferred.resolve(albums);
   });

   return deferred.promise;
}

function getById(_id) {
   var deferred = Q.defer();

   db.albums.findById(_id, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) {
         // return user (without hashed password)
         deferred.resolve(_.omit(user, 'hash'));
      } else {
         // user not found
         deferred.resolve();
      }
   });

   return deferred.promise;
}

function create(albumParam) {
   var deferred = Q.defer();

   // validation
   db.albums.findOne(
      {name: albumParam.name},
      function (err, album) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         if (album) {
            deferred.reject('Album "' + albumParam.name + '" already exists');
         } else {
            createAlbum();
         }
      });

   function createAlbum() {
      var write = JSON.parse(JSON.stringify(albumParam));
      write._id = albumParam.name;
      // set user object to albumParam without the cleartext password
      db.albums.insert(
         write,
         {w: 1, safe: true},
         function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            fs.mkdir(config.static + "albums/");
            deferred.resolve();
         });
   }

   return deferred.promise;
}

function update(_id, albumParam) {
   var deferred = Q.defer();

   // validation
   db.albums.findById(_id, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user.name !== albumParam.name) {
         // name has changed so check if the new name is already taken
         db.albums.findOne(
            {name: albumParam.name},
            function (err, user) {
               if (err) deferred.reject(err.name + ': ' + err.message);

               if (user) {
                  // name already exists
                  deferred.reject('Album "' + req.body.name + '" already exists')
               } else {
                  updateAlbum();
               }
            });
      } else {
         updateAlbum();
      }
   });

   function updateAlbum() {
      // fields to update
      var set = {
         name: albumParam.name,
         title: albumParam.title,
         date: new Date(),
         description: albumParam.description
      };

      db.albums.update(
         {_id: albumParam.name},
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

   db.albums.remove(
      {_id: mongo.helper.toObjectID(_id)},
      function (err) {
         if (err) deferred.reject(err.name + ': ' + err.message);

         deferred.resolve();
      });

   return deferred.promise;
}