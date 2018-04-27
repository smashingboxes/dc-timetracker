'use strict';
define([
    'angular',
    'angularMocks',
    'app'
], angular => {
    describe('App Controller', () => {
        let $scope,
            $location;

        beforeEach(module('flash'));

        beforeEach(inject(($rootScope, $controller, _$location_) => {
            $scope = $rootScope.$new();
            $location = _$location_;

            $controller('AppController', { $scope });
        }));

        it('should go to the specified page', () => {
            spyOn($location, 'path');
            $scope.goto('test');
            expect($location.path).toHaveBeenCalledWith('test');
        });
    });
});
