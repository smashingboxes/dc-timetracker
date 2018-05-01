define([
    'angular',
    'angularMocks',
    'features/timesheets/timesheets'
], angular => {
    describe('Timesheets  Controller', () => {
        let $scope,
            $httpBackend;

        beforeEach(module('flash.components'));
        beforeEach(module('flash.timesheets'));

        beforeEach(inject(($rootScope, _$httpBackend_, $controller, data) => {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            $controller('TimesheetsController', {
                $scope
            });
        }));

        it('should get the total hours for a time entry row', () => {
            const test = {
                hours: [
                    { hoursWorked: 8 },
                    { hoursWorked: 7 },
                    { hoursWorked: 6 }
                ]
            };

            expect($scope.getTotal(test)).toEqual(21);
        });

        it('should get the total hours worked for a specific day', () => {
            const date = new Date();
            $scope.timeEntryObj = {
                timeEntrySets: [
                    {
                        hours: [
                            { date, hoursWorked: 8 },
                            { date: 1234, hoursWorked: 8 },
                            { date: 2345, hoursWorked: 8 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 7 },
                            { date: 1234, hoursWorked: 7 },
                            { date: 2345, hoursWorked: 7 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 6 },
                            { date: 1234, hoursWorked: 6 },
                            { date: 2345, hoursWorked: 6 },
                        ]
                    },
                ]
            };

            expect($scope.getDateTotal(date)).toEqual(21);
        });

        it('should get the grand total number of hours worked in a time entry', () => {
            const date = new Date();
            $scope.timeEntryObj = {
                timeEntrySets: [
                    {
                        hours: [
                            { date, hoursWorked: 8 },
                            { date: 1234, hoursWorked: 8 },
                            { date: 2345, hoursWorked: 8 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 7 },
                            { date: 1234, hoursWorked: 7 },
                            { date: 2345, hoursWorked: 7 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 6 },
                            { date: 1234, hoursWorked: 6 },
                            { date: 2345, hoursWorked: 6 },
                        ]
                    },
                ]
            };

            expect($scope.getGrandTotal()).toEqual(63);
        });

        xit('should submit a time entry successfully', () => {
            $httpBackend.expect('POST', '/api/v1/timesheets').respond({ success: true });
            const date = new Date();
            $scope.timeEntryObj = {
                timeEntrySets: [
                    {
                        hours: [
                            { date, hoursWorked: 8 },
                            { date: 1234, hoursWorked: 8 },
                            { date: 2345, hoursWorked: 8 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 7 },
                            { date: 1234, hoursWorked: 7 },
                            { date: 2345, hoursWorked: 7 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 6 },
                            { date: 1234, hoursWorked: 6 },
                            { date: 2345, hoursWorked: 6 },
                        ]
                    },
                ]
            };
            $scope.saveTime();
            $httpBackend.flush();
            expect($scope.saveSuccess).toBe(true);
            expect($scope.submitError).toBe(undefined);
            expect($scope.processing).toBe(undefined);

        });

        xit('should handle an API submit error gracefully', () => {
            $httpBackend.expect('POST', '/api/v1/timesheets').respond(500);
            const date = new Date();
            $scope.timeEntryObj = {
                timeEntrySets: [
                    {
                        hours: [
                            { date, hoursWorked: 8 },
                            { date: 1234, hoursWorked: 8 },
                            { date: 2345, hoursWorked: 8 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 7 },
                            { date: 1234, hoursWorked: 7 },
                            { date: 2345, hoursWorked: 7 },
                        ]
                    },
                    {
                        hours: [
                            { date, hoursWorked: 6 },
                            { date: 1234, hoursWorked: 6 },
                            { date: 2345, hoursWorked: 6 },
                        ]
                    },
                ]
            };
            $scope.saveTime();
            $httpBackend.flush();
            expect($scope.saveSuccess).toBe(undefined);
            expect($scope.submitError).toBe(true);
            expect($scope.processing).toBe(undefined);

        });
    });
});
