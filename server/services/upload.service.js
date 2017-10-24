var express = require('express');
var config = require('../config.json');
var Q = require('q');

var mongoose = require('mongoose');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
mongoose.connect(config.connectionString + '/gridfstest');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

var service = {};

service.addFile = addFile;
service.getPhoto = getPhoto;

module.exports = service;

var storage = GridFsStorage({
   url: 'mongodb://localhost:27017/photos',
   file: function (req, file) {
      return {
         filename: file.originalname,
         metadata: {
            albumId: 'Heroes'
         }
      };
   }
});

var upload = multer({ //multer settings for single upload
   storage: storage
}).single('file');

function addFile(req, res, deferred) {
   console.log(req.body)
   upload(req, res, function (err) {
      if (err) {
         deferred.reject({message: 'Unable to upload image'});
         return;
      }
      deferred.resolve({message: 'Upload successful!'});
   });

   return deferred.promise;
}

function getPhoto(query, res, deferred) {
   gfs.collection('fs'); //set collection name to lookup into

   gfs.files.find(query).toArray(function (err, files) {
      console.log(files)
      if (!files || files.length === 0) {
         deferred.reject('Couldn\'t find images');
         return;
      }

      var readstream = gfs.createReadStream({
         filename: files[0].filename,
         root: "fs"
      });

      res.set('Content-Type', files[0].contentType);

      deferred.resolve(readstream.pipe(res));
      return readstream.pipe(res);
   });

   return deferred.promise;
}