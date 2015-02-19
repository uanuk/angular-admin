var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-pagination');
var User = require('../model/user.js');
var Group = require('../model/group.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query;
  if (req.query.filter !== undefined){
    query = User.find({'userName': new RegExp('.*' + req.query.filter + '.*', "i")});
  } else {
    query = User.find();
  }
  if (req.query.page !== undefined && req.query.limit !== undefined){
    query = query.paginate(req.query.page, req.query.limit);
  }
  query.exec(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET users count. */
router.get('/count', function(req, res, next)   {
  var query;
  if (req.query.filter !== undefined){
    query = User.find({'userName': new RegExp('.*' + req.query.filter + '.*', "i")});
  } else {
    query = User.find();
  }
  query.count(function (err, c) {
    if (err) return next(err);
    res.json(c);
  });
});

/* Add */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Get */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id).populate('groups').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update */
router.put('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user){
    if (err) return next(err);
    user.userName = req.body.userName;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.save(function(err, user){
      if (err) return next(err);
      res.json(user);
    });
  });
});

/* Delete */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* add to group */
router.put('/:id/groups/:groupId', function(req, res, next) {
  User.findById(req.params.id).populate('groups').exec(function (err, post) {
    if (err) return next(err);
    Group.findById(req.params.groupId, function(err, group){
      if (err) return next(err);
      post.groups.push(group);
      post.save(function (err, post) {
        if (err) return next(err);
        res.json(post);
      })
    });
  });
});

module.exports = router;
