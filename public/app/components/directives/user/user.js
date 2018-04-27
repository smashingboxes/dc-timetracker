'use strict';
define([
    'angular',
    'components/components'
], angular => {
    function UserController($scope, $auth, authService, data, $mdDialog) {
        $scope.auth = authService.data;
        $scope.openLoginOptions = e => {
            delete $scope.loginError;
            $mdDialog.show({
                title: 'Register / Login',
                templateUrl: 'app/components/directives/user/user-login-modal.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: e
            });
        };

        $scope.closeDialog = () => {
            $mdDialog.hide();
        };

        $scope.createAccount = () => {
            $auth.submitRegistration($scope.newUser)
                .then(user => {
                    $scope.user = user;
                    $mdDialog.hide();
                }, () => {
                    $scope.createUserError = 'There was an error creating your user';
                });
        };

        $scope.login = () => {
            $auth.submitLogin($scope.auth)
                .then(data => {
                    $scope.auth.user = data.data.user;
                    $mdDialog.hide();
                }, () => {
                    $scope.loginError = true;
                });
        };

        $scope.logout = () => {
            data.auth.delete();
            delete $scope.auth.user;
        };
    }

    function UserDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/directives/user/user.html',
            controller: 'UserController',
            scope: {}
        };
    }

    angular
        .module('flash.components')
        .config($authProvider => {
            $authProvider.loginUrl = '/api/auth';
        })
        .controller('UserController', UserController)
        .directive('pUser', UserDirective);
});
