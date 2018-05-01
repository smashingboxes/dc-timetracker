'use strict';
define([
    'angular',
    'components/components'
], angular => {
    function UserController($scope, $auth, authService, data, $mdDialog, $location) {
        $auth.validateUser().then(user => authService.data.user = user, delete authService.data.user);
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
                    $scope.auth.user = data;
                    $mdDialog.hide();
                }, () => {
                    $scope.loginError = true;
                });
        };

        $scope.logout = () => {
            $auth.signOut().then(() => {
                delete $scope.auth.user;
                $location.path('/login');
            }, () => {
                delete $scope.auth.user;
                $location.path('/login');
            });
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
