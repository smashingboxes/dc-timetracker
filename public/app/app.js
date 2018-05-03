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
    'features/timesheets/timesheets',
    'features/approve/approve',
    'features/admin/admin',
    'features/admin/jobs/jobs',
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
        'flash.login',
        'flash.timesheets',
        'flash.approve',
        'flash.admin'
    ]);

    app.config(($routeProvider, $qProvider) => {
        $routeProvider.otherwise({
            redirectTo: '/404'
        });

        $qProvider.errorOnUnhandledRejections(false);
    });

    function AppController($scope, $auth, $location, authService) {
        $scope.auth = authService.data;
        $auth.validateUser().then(user => {
            authService.data.user = user;
            if ($location.path() === '/login') {
                $location.path('/');
            }
        }, () => {
            delete authService.data.user;
            $location.path('/login');
        });
        $scope.currentNavItem = '/';
        $scope.goto = page => {
            $location.path(page);
        };
    }

    app.controller('AppController', AppController);

    return app;
});
