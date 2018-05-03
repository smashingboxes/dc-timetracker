'use strict';
define([
    'angular',
    'features/admin/admin',
    'components/components',
    'components/services/data-service'
], angular => {
    function JobsController($scope, data, $mdDialog) {
        $scope.jobs = [];
        $scope.openJobModal = e => {
            $mdDialog.show({
                title: 'Job Details',
                scope: $scope,
                templateUrl: 'app/features/admin/jobs/job-modal.html',
                preserveScope: true,
                targetEvent: e
            });
        };

        $scope.closeModal = () => $mdDialog.hide();

        $scope.submitJob = () => {
            $scope.processing = true;
            data.jobs.save($scope.job, job => {
                $scope.jobs.push(job);
                $scope.closeModal();
                delete $scope.processing;
            }, () => {
                delete $scope.processing;
                $scope.jobError = true;
            });
        };
    }

    angular.module('flash.admin')
        .config($routeProvider => {
            $routeProvider.when('/admin/jobs', {
                controller: 'JobsController',
                templateUrl: 'app/features/admin/jobs/jobs.html'
            });
        })
        .controller('JobsController', JobsController);
});

