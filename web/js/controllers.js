'use strict';

/* Controllers */

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserListCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.pageChanged = function(){
      User.all($scope.currentPage, 5, $scope.query).success(function (data){
        $scope.users = data;
      })
    };
    $scope.init=function(){
      User.count($scope.query).success(function (data){
        $scope.totalItems = data;
      })
      $scope.currentPage = 1;
      $scope.pageChanged();
    };
    $scope.filter = function(){
      $scope.init();
    }
    $scope.init();
  }]);

userControllers.controller('UserEditCtrl', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    User.get($routeParams.userId).success(
        function(data){
          $scope.user = data
          User.name = data.firstName + ' ' + data.lastName;
        });
    $scope.save = function(){
      if ($scope.user !== null && $scope.user._id !== null){
        User.update($scope.user);
      } else {
        User.create($scope.user);
      }
      $scope.userForm.$setPristine();
    };
    $scope.delete = function(){
      if ($scope.user !== null && $scope.user._id !== null){
        User.delete($scope.user);
      }
    };
  }]);

var groupControllers = angular.module('groupControllers', []);

groupControllers.controller('GroupListCtrl', ['$scope', 'Group',
  function($scope, Group) {
    $scope.pageChanged = function(){
      Group.all($scope.currentPage, 5, $scope.query).success(function (data){
        $scope.groups = data;
      })
    };
    $scope.init=function(){
      Group.count($scope.query).success(function (data){
        $scope.totalItems = data;
      })
      $scope.currentPage = 1;
      $scope.pageChanged();
    };
    $scope.filter = function(){
      $scope.init();
    }
    $scope.init();
  }]);

groupControllers.controller('GroupEditCtrl', ['$scope', '$routeParams', 'Group',
  function($scope, $routeParams, Group) {
    Group.get($routeParams.groupId).success(
        function(data){
          $scope.group = data
          Group.name = data.name;
        });
    $scope.save = function(){
      if ($scope.group !== null && $scope.group._id !== null){
        Group.update($scope.group);
      } else {
        Group.create($scope.group);
      }
      $scope.groupForm.$setPristine();
    };
    $scope.delete = function(){
      if ($scope.group !== null && $scope.group._id !== null){
        Group.delete($scope.group);
      }
    };
  }]);

groupControllers.controller('GroupUsersCtrl', ['$scope', '$routeParams', 'Group',
  function($scope, $routeParams, Group) {
    $scope.groupId=$routeParams.groupId;
    $scope.pageChanged = function(){
      Group.users($scope.groupId, $scope.currentPage, 5).success(function (data){
        $scope.users = data;
      })
    };
    $scope.init=function(){
      Group.usersCount($scope.groupId).success(function (data){
        $scope.totalItems = data;
      })
      $scope.currentPage = 1;
      $scope.pageChanged();
    };
    $scope.init();
  }]);

var breadcrumb = angular.module('breadcrumbControllers', []);
breadcrumb.controller('BreadcrumbController', [
  '$scope',
  'breadcrumbs',
  '$route',
  'User',
  'Group',
  function($scope, breadcrumbs, $route, User, Group) {
    $scope.breadcrumbs = breadcrumbs;
    $scope.breadcrumbs.getDynamic = function(){
      var res = $scope.breadcrumbs.get();
      var routes = $route.routes;
      for (var index = 0; index < res.length; ++index) {
          var originalPath = res[index].originalPath;
          if (routes[originalPath] &&
              routes[originalPath].dynamicLabelsId &&
              !routes[originalPath].excludeBreadcrumb) {
            if ("userId" == routes[originalPath].dynamicLabelsId){
              res[index].label = User.name;
            } else if ("groupId" == routes[originalPath].dynamicLabelsId){
              res[index].label = Group.name;
            }
          }
      }
      return res;
    }
  }]);
