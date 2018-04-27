'use strict';
define([
    'angular',
    'components/components'
], angular => {
    function AuthService() {
        const dataStore = {};

        return {
            data: dataStore
        };
    }

    angular.module('flash.components').factory('authService', AuthService);
});
