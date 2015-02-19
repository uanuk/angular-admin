'use strict';

/* Services */

var usersServices = angular.module('usersServices', []);

usersServices.factory('User', ['$http',
  function($http){
    var factory = {};
    factory.all = function(page, limit, filter){return $http.get('http://localhost:3000/users', {params: {page: page, limit: limit, filter: filter}})};
    factory.count = function(filter){return $http.get('http://localhost:3000/users/count', {params: {filter: filter}})};
    factory.get = function(id){return $http.get('http://localhost:3000/users/'+id)};
    factory.create = function(user){
      return $http.post('http://localhost:3000/users/', user)
    };
    factory.update = function(user){
      return $http.put('http://localhost:3000/users/'+user._id, user)
    };
    factory.delete = function(id){return $http.get('http://localhost:3000/users/')};
    return factory;
  }]);

usersServices.factory('Group', ['$http',
  function($http){
    var factory = {};
    factory.all = function(page, limit, filter){return $http.get('http://localhost:3000/groups', {params: {page: page, limit: limit, filter: filter}})};
    factory.count = function(filter){return $http.get('http://localhost:3000/groups/count', {params: {filter: filter}})};
    factory.get = function(id){return $http.get('http://localhost:3000/groups/'+id)};
    factory.create = function(user){
      return $http.post('http://localhost:3000/groups/', user)
    };
    factory.update = function(user){
      return $http.put('http://localhost:3000/groups/'+user._id, user)
    };
    factory.delete = function(id){return $http.get('http://localhost:3000/groups/')};

    factory.users = function(id, page, limit){return $http.get('http://localhost:3000/groups/'+id+'/users', {params: {page: page, limit: limit}})};
    factory.usersCount = function(id){return $http.get('http://localhost:3000/groups/'+id+'/users/count')};

    return factory;
  }]);