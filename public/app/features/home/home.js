'use strict';
define(
    [
        'angular'
    ],
    (angular) => {
        function HomeController() {
        }

        angular.module('flash.home', [])
        .config($routeProvider => {
            $routeProvider.when('/', {
                controller: 'HomeController',
                templateUrl: 'app/features/home/home.html'
            });
        })
        .controller('HomeController', HomeController);
    }
);

