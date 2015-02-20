'use strict';

/* Services */

var usersServices = angular.module('usersServices', []);

usersServices.factory('User', ['$http', '$location',
  function($http, $location){
    var factory = {};
    var serverUrl = $location.protocol() + '://' +  $location.host() + ':' + $location.port() + "/";
    factory.all = function(page, limit, filter){return $http.get(serverUrl + 'users', {params: {page: page, limit: limit, filter: filter}})};
    factory.count = function(filter){return $http.get(serverUrl + 'users/count', {params: {filter: filter}})};
    factory.get = function(id){return $http.get(serverUrl + 'users/'+id)};
    factory.create = function(user){
      return $http.post(serverUrl + 'users/', user)
    };
    factory.update = function(user){
      return $http.put(serverUrl + 'users/'+user._id, user)
    };
    factory.delete = function(id){return $http.get(serverUrl + 'users/')};
    return factory;
  }]);

usersServices.factory('Group', ['$http', '$location',
  function($http, $location){
    var factory = {};
    var serverUrl = $location.protocol() + '://' +  $location.host() + ':' + $location.port() + "/";
    factory.all = function(page, limit, filter){return $http.get(serverUrl + 'groups', {params: {page: page, limit: limit, filter: filter}})};
    factory.count = function(filter){return $http.get(serverUrl + 'groups/count', {params: {filter: filter}})};
    factory.get = function(id){return $http.get(serverUrl + 'groups/'+id)};
    factory.create = function(user){
      return $http.post(serverUrl + 'groups/', user)
    };
    factory.update = function(user){
      return $http.put(serverUrl + 'groups/'+user._id, user)
    };
    factory.delete = function(id){return $http.get(serverUrl + 'groups/')};

    factory.users = function(id, page, limit){return $http.get(serverUrl + 'groups/'+id+'/users', {params: {page: page, limit: limit}})};
    factory.usersCount = function(id){return $http.get(serverUrl + 'groups/'+id+'/users/count')};

    return factory;
  }]);