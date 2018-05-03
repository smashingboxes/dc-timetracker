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
                timeEntries: [
                    { hours: 8 },
                    { hours: 7 },
                    { hours: 6 }
                ]
            };

            expect($scope.getTotal(test)).toEqual(21);
        });

        it('should get the total hours worked for a specific day', () => {
            const date = new Date();
            $scope.timeEntryObj = {
                timeEntrySets: [
                    {
                        timeEntries: [
                            { date, hours: 8 },
                            { date: 1234, hours: 8 },
                            { date: 2345, hours: 8 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 7 },
                            { date: 1234, hours: 7 },
                            { date: 2345, hours: 7 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 6 },
                            { date: 1234, hours: 6 },
                            { date: 2345, hours: 6 },
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
                        timeEntries: [
                            { date, hours: 8 },
                            { date: 1234, hours: 8 },
                            { date: 2345, hours: 8 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 7 },
                            { date: 1234, hours: 7 },
                            { date: 2345, hours: 7 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 6 },
                            { date: 1234, hours: 6 },
                            { date: 2345, hours: 6 },
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
                        timeEntries: [
                            { date, hours: 8 },
                            { date: 1234, hours: 8 },
                            { date: 2345, hours: 8 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 7 },
                            { date: 1234, hours: 7 },
                            { date: 2345, hours: 7 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 6 },
                            { date: 1234, hours: 6 },
                            { date: 2345, hours: 6 },
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
                        timeEntries: [
                            { date, hours: 8 },
                            { date: 1234, hours: 8 },
                            { date: 2345, hours: 8 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 7 },
                            { date: 1234, hours: 7 },
                            { date: 2345, hours: 7 },
                        ]
                    },
                    {
                        timeEntries: [
                            { date, hours: 6 },
                            { date: 1234, hours: 6 },
                            { date: 2345, hours: 6 },
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

        it('should return the job name by id', () => {
            $scope.jobs = [
                { id: 1, name: 'Job 1' },
                { id: 2, name: 'Job 2' },
                { id: 3, name: 'Job 3' }
            ];

            expect($scope.getJobName(2)).toEqual('Job 2');
        });

        it('should not return the job name if no id is provided', () => {
            $scope.jobs = [
                { id: 1, name: 'Job 1' },
                { id: 2, name: 'Job 2' },
                { id: 3, name: 'Job 3' }
            ];

            expect($scope.getJobName()).toEqual('');
        });
    });
});
