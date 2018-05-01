'use strict';
define([
    'angular',
    'angularMocks',
    'components/services/auth-service',
    'features/login/login'
], angular => {
    describe('Login Controller', () => {
        let $scope,
            $httpBackend,
            authService,
            $location;

        beforeEach(module('flash.components'));
        beforeEach(module('flash.login'));

        beforeEach(inject(($rootScope, _$httpBackend_, $controller, _$location_, _authService_) => {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            authService = _authService_;

            $controller('LoginController', {
                $scope,
                authService,
                $location
            });
        }));

        it('should create a new account', () => {
            //const testUser = {
            //    email: 'test@example.com',
            //    id: 1
            //};

            //$httpBackend.expect('POST', '/api/v1/users').respond(testUser);
            //spyOn($scope, 'login');
            //$scope.newUSer = {
            //    email: 'test@example.com',
            //    password: 'abcd1234',
            //    confirmPassword: 'abcd1234'
            //};

            //$scope.createAccount();
            //$httpBackend.flush();
            //expect($scope.auth).toEqual({ email: 'test@example.com', password: 'abcd1234' });
            //expect($scope.login).toHaveBeenCalled();

        });

        it('should show account creation error when attempt fails', () => {
            //$httpBackend.expect('POST', '/api/v1/users').respond(500);
            //spyOn($scope, 'login');
            //$scope.newUSer = {
            //    email: 'test@example.com',
            //    password: 'abcd1234',
            //    confirmPassword: 'abcd1234'
            //};

            //$scope.createAccount();
            //$httpBackend.flush();
            //expect($scope.createUserError).toBe(true);

        });

        it('should sign the user in', () => {
            //spyOn($location, 'path');
            //$scope.auth = { email: 'test@example.com', password: 'abcd1234' };
            //$scope.login();
            //expect($location.path).toHaveBeenCalledWith('/');

        });

        it('should show sign in error when sign in fails', () => {
            //spyOn($location, 'path');
            //$scope.auth = { email: 'test@example.com', password: 'abcd1234' };
            //$scope.login();
            //expect($scope.loginError).toBe(true);
        });

    });
});
