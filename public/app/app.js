'use strict';
define([
    'angular',
    'angularRoute',
    'angularResource',
    'angularAnimate',
    'angularSanitize',
    'angularCookies',
    'angularAria',
    'angularMaterial',
    'moment',
    'mdPickers',
    'satellizer',
    'ngTokenAuth',
    'components/components',
    //VALUES
    'components/values/countries',
    //SERVICES
    'components/services/auth-service',
    'components/services/data-service',
    //DIRECTIVES
    'components/directives/user/user',
    'components/directives/focus/focus',
    //FEATURES
    'features/home/home',
    'features/login/login',
],
angular => {
    var app = angular.module('flash', [
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'mdPickers',
        'satellizer',
        'ng-token-auth',
        'flash.values',
        'flash.components',
        'flash.home',
        'flash.login'
    ]);

    app.config($routeProvider => {
        $routeProvider.otherwise({
            redirectTo: '/404'
        });
    });

    function AppController($scope, $location, authService) {
        if (!authService.data.user) {
            $location.path('/login');
        }
        $scope.currentNavItem = '/';
        $scope.goto = page => {
            $location.path(page);
        };
    }

    app.controller('AppController', AppController);

    return app;
});
