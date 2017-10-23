var express = require('express');
var router = express.Router();
var photoService = require('../services/photo.service');

router.get('/', getPhotos);
router.post('/', addPhoto);
router.get('/:_id', getPhoto);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function getPhotos (req, res) {
   photoService.getAll(req.params._id)
      .then(function (users) {
         res.send(users);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function addPhoto(req, res) {
   photoService.upload(req.body, req.files)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function getPhoto (req, res) {
   photoService.getById(req.params._id)
      .then(function (user) {
         if (user) {
            res.send(user);
         } else {
            res.sendStatus(404);
         }
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