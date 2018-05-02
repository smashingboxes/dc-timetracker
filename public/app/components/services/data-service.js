'use strict';
define(
    [
        'angular',
        'angularResource',
        '../components'
    ],
    angular => {
        function DataService($resource) {
            const auth = $resource('/api/auth', { }, {
                login: {
                    method: 'POST'
                }
            });

            const timesheets = $resource('/api/v1/timesheets/:id', { id: '@id' }, {
                update: { method: 'PUT' }
            });

            return {
                auth,
                timesheets
            };
        }

        angular.module('flash.components')
        .factory('data', DataService);

    }
);
