'use strict';
define(
    [
        'angular',
        'ngTokenAuth',
        'angularResource'
    ],
    angular => {
        angular.module('flash.components', ['ngResource', 'ng-token-auth']);
    }
);
