'use strict';

/* App Module */

var adminApp = angular.module('adminApp', ['ngRoute', 'ng-breadcrumbs', 'ui.bootstrap.pagination',
  'breadcrumbControllers',
  'groupControllers',
  'userControllers',
  'usersServices'
]);

adminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
          templateUrl: 'partials/user-list.html',
          controller: 'UserListCtrl',
          label: 'Users'
        }).
        when('/users/:userId', {
          templateUrl: 'partials/user-edit.html',
          controller: 'UserEditCtrl',
          label: 'Edit User',
          dynamicLabelsId: 'userId'
        }).
        when('/groups', {
          templateUrl: 'partials/group-list.html',
          controller: 'GroupListCtrl',
          label: 'Groups'
        }).
        when('/groups/:groupId', {
          templateUrl: 'partials/group-edit.html',
          controller: 'GroupEditCtrl',
          label: 'Edit Group',
          dynamicLabelsId: 'groupId'
        }).
        when('/groups/:groupId/users', {
          templateUrl: 'partials/group-users.html',
          controller: 'GroupUsersCtrl',
          label: 'Users'
        }).
        when('/',{
          templateUrl: 'partials/home.html',
          label: 'Home'
        }).
      otherwise({
        redirectTo: '/'
      });
  }]);