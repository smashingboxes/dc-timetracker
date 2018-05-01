'use strict';
define([
    'angular',
    'app',
    'ngTokenAuth',
    'components/components'
], angular => {
    function LoginController($scope, $auth, authService, data, $location) {
        $scope.auth = authService.data;
        if ($scope.auth.user) {
            $location.path('/');
        }

        $scope.createAccount = () => {
            $auth.submitRegistration($scope.newUser)
                .then(() => {
                    $scope.auth = { email: $scope.newUser.email, password: $scope.newUser.password };
                    $scope.login();
                }, () => {
                    $scope.createUserError = 'There was an error creating your user';
                });
        };

        $scope.login = () => {
            $auth.submitLogin($scope.auth)
                .then(data => {
                    $scope.auth.user = data;
                    $location.path('/');
                }, () => {
                    $scope.loginError = true;
                });
        };
    }

    angular
        .module('flash.login', ['ngRoute', 'ng-token-auth'])
        .config(($routeProvider, $authProvider) => {
            $routeProvider.when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/features/login/login.html'
            });

            $authProvider.configure({
                apiUrl: '/api/v1',
                emailSignInPath: '/users/sign_in',
                signOutUrl: '/users/sign_out',
                emailRegistrationPath: '/users',
                tokenValidationPath: '/users/validate_token'
            });
        })
        .controller('LoginController', LoginController);
});

