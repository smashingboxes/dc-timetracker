'use strict';
define([
    'angular',
    'components/components',
    'components/services/data-service'
], angular => {
    function TimesheetsController($scope, data, $filter) {
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
            rows.push({ timeEntries: [] });
        }

        $scope.timeEntryObj = { periodStart: dates[0], timeEntrySets: rows };

        $scope.processing = true;
        data.jobs.query(jobs => {
            $scope.jobs = jobs;
            delete $scope.processing;
        });

        $scope.saveTime = () => {
            $scope.processing = true;
            delete $scope.submitError;
            delete $scope.saveSuccess;
            data.timesheets.save($scope.timeEntryObj, () => {
                delete $scope.processing;
                $scope.saveSuccess = true;
            }, () => {
                delete $scope.processing;
                $scope.submitTimeError = true;
            });
        };

        $scope.getTotal = timeEntry => {
            let total = 0;
            timeEntry.timeEntries.forEach(entry => total += entry.hours * 1 || 0);
            return total;
        };

        $scope.getDateTotal = date => {
            let total = 0;
            $scope.timeEntryObj.timeEntrySets.forEach(timeEntry => {
                timeEntry.timeEntries.forEach(entry => {
                    if (entry.date === date) {
                        total += entry.hours * 1 || 0;
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

        $scope.getJobName = id => id ? $filter('filter')($scope.jobs, { id }, true)[0].name : '';

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
