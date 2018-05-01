'use strict';
define([
    'angular',
    'components/components',
    'components/services/data-service'
], angular => {
    function TimesheetsController($scope, data) {
        function getLastDayOfMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }

        const today = new Date();
        const startDay = today.getDate() > 15 ? 16 : 1;
        const endDay = today.getDate() > 15 ? getLastDayOfMonth(today.getMonth() + 1, today.getYear()) : 15;
        const dates = [];

        for (let i = startDay; i <= endDay; i++) {
            let date = new Date(today.getFullYear(), today.getMonth(), i);
            dates.push(date);
        }

        $scope.startDate = dates[0];
        $scope.endDate = dates[dates.length - 1];
        $scope.dates = dates;
        const rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push({ hours: [] });
        }

        $scope.timeEntryObj = { timeEntrySets: rows };

        $scope.saveTime = () => {
            delete $scope.submitError;
            delete $scope.saveSuccess;
            data.timesheets.save($scope.timeEntryObj, () => {
                delete $scope.processing;
                $scope.saveSuccess = true;
            }, () => {
                $scope.submitTimeError = true;
            });
        };

        $scope.getTotal = timeEntry => {
            let total = 0;
            timeEntry.hours.forEach(hour => total += hour.hoursWorked * 1 || 0);
            return total;
        };

        $scope.getDateTotal = date => {
            let total = 0;
            $scope.timeEntryObj.timeEntrySets.forEach(timeEntry => {
                timeEntry.hours.forEach(hour => {
                    if (hour.date === date) {
                        total += hour.hoursWorked * 1 || 0;
                    }
                });
            });
            return total;
        };

        $scope.getGrandTotal = () => {
            let total = 0;
            $scope.timeEntryObj.timeEntrySets.forEach(timeEntry => total += $scope.getTotal(timeEntry));
            return total;
        };

    }

    angular.module('flash.timesheets', ['ngResource', 'ngRoute'])
        .config($routeProvider => {
            $routeProvider.when('/timesheets', {
                controller: 'TimesheetsController',
                templateUrl: 'app/features/timesheets/enter-time.html'
            });
        })
        .controller('TimesheetsController', TimesheetsController);
});
