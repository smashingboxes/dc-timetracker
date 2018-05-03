define([
    'angular',
    'angularMocks',
    'features/approve/approve'
], angular => {
    describe('Approve  Controller', () => {
        let $scope,
            $httpBackend;

        beforeEach(module('flash.components'));
        beforeEach(module('flash.approve'));

        beforeEach(inject(($rootScope, _$httpBackend_, $controller, data) => {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            $controller('ApproveController', {
                $scope
            });
        }));
    });
});
