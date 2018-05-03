define([
    'angular',
    'angularMocks',
    'features/admin/jobs/jobs'
], angular => {
    describe('Jobs  Controller', () => {
        let $scope,
            $mdDialog,
            $httpBackend;

        beforeEach(module('flash.components'));
        beforeEach(module('flash.admin'));

        beforeEach(inject(($rootScope, _$httpBackend_, $controller, data, _$mdDialog_) => {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $mdDialog = _$mdDialog_;

            $controller('JobsController', {
                $scope
            });
        }));


        it('should open the jobs modal', () => {
            spyOn($mdDialog, 'show');
            $scope.openJobModal();
            expect($mdDialog.show).toHaveBeenCalled();
        });

        it('should close the modal', () => {
            spyOn($mdDialog, 'hide');
            $scope.closeModal();
            expect($mdDialog.hide).toHaveBeenCalled();
        });


        xit('should submit a job', () => {
            $httpBackend.expect('POST', '/api/v1/jobs').respond({ code: 'TestCode', name: 'Test Job' });
            spyOn($scope, 'closeModal');
            $scope.job = {
                name: 'Test Job',
                code: 'TestCode'
            };
            $scope.submitJob();
            expect($scope.closeModal).toHaveBeenCalled();
        });
    });
});

