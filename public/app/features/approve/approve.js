'use strict';
define([
    'angular',
    'components/components',
    'components/services/data-service'
], angular => {
    function ApproveController($scope, data) {
        function getLastDayOfMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }

        $scope.processing = true;
        const today = new Date();
        const startDay = today.getDate() > 15 ? 16 : 1;
        const endDay = today.getDate() > 15 ? getLastDayOfMonth(today.getMonth() + 1, today.getYear()) : 15;
        $scope.periodStart = new Date(today.getFullYear(), today.getMonth(), startDay);
        $scope.periodEnd = new Date(today.getFullYear(), today.getMonth(), endDay);

        data.timesheets.query({ periodStart: $scope.periodStart }, timesheets => {
            delete $scope.processing;
            console.log(timesheets);
            $scope.timesheets = timesheets;
        });

        $scope.getTotal = timeEntry => {
            let total = 0;
            timeEntry.timeEntries.forEach(entry => total += entry.hours * 1 || 0);
            return total;
        };

        $scope.getGrandTotal = timesheet => {
            let total = 0;
            timesheet.timeEntrySets.forEach(timeEntry => total += $scope.getTotal(timeEntry));
            return total;
        };
    }

    angular.module('flash.approve', ['ngResource', 'ngRoute'])
        .config($routeProvider => {
            $routeProvider.when('/approve', {
                controller: 'ApproveController',
                templateUrl: 'app/features/approve/approve.html'
            });
        })
        .controller('ApproveController', ApproveController);
});
