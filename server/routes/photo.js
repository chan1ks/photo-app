var express = require('express');
var router = express.Router();
var photoService = require('../services/photo.service');

router.get('/:albumId', getPhotos);
router.get('/:filename', getPhoto);
router.post('/', addPhoto);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function getPhotos(req, res) {
   photoService.getAll(req, res)
      .then(function (photos) {
         res.send(photos);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function getPhoto(req, res) {
   photoService.getByFileName(req, res)
      .then(function (photo) {
         if (photo) {
            res.send(photo);
         } else {
            res.sendStatus(404);
         }
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function addPhoto(req, res) {
   photoService.upload(req, req.body)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function update(req, res) {
   photoService.update(req.params._id, req.body)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function _delete(req, res) {
   photoService.delete(req.params._id)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}