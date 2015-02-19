var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-pagination');
var Group = require('../model/group.js');
var User = require('../model/user.js');

/* GET groups listing. */
router.get('/', function(req, res, next) {
  var query;
  if (req.query.filter !== undefined){
    query = Group.find({'name': new RegExp('.*' + req.query.filter + '.*', "i")});
  } else {
    query = Group.find();
  }
  if (req.query.page !== undefined && req.query.limit !== undefined){
    query = query.paginate(req.query.page, req.query.limit);
  }
  query.exec(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET groups count. */
router.get('/count', function(req, res, next)   {
  var query;
  if (req.query.filter !== undefined){
    query = Group.find({'userName': new RegExp('.*' + req.query.filter + '.*', "i")});
  } else {
    query = Group.find();
  }
  query.count(function (err, c) {
    if (err) return next(err);
    res.json(c);
  });
});

/* Add */
router.post('/', function(req, res, next) {
  Group.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Get */
router.get('/:id', function(req, res, next) {
  Group.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update */
router.put('/:id', function(req, res, next) {
  Group.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete */
router.delete('/:id', function(req, res, next) {
  Group.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id/users', function(req, res, next){
  var query = User.find({'groups' : req.params.id});
  if (req.query.page !== undefined && req.query.limit !== undefined){
    query = query.paginate(req.query.page, req.query.limit);
  }
  query.exec(function(err, count){
    if (err) return next(err);
    res.json(count);
  });
});

router.get('/:id/users/count', function(req, res, next){
  User.find({'groups' : req.params.id}).count().exec(function(err, count){
    if (err) return next(err);
    res.json(count);
  });
});

module.exports = router;
