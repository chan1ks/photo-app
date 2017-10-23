var express = require('express');
var router = express.Router();
var albumService = require('../services/album.service');

router.get('/', getAlbums);
router.post('/', addAlbum);
router.get('/:_id', getAlbum);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function getAlbums (req, res) {
   albumService.getAll()
      .then(function (users) {
         res.send(users);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function addAlbum(req, res) {
   albumService.create(req.body)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function getAlbum (req, res) {
   albumService.getById(req.params._id)
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
   albumService.update(req.params._id, req.body)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}

function _delete(req, res) {
   albumService.delete(req.params._id)
      .then(function () {
         res.sendStatus(200);
      })
      .catch(function (err) {
         res.status(400).send(err);
      });
}