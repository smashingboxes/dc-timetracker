'use strict';
describe('Time Management', () => {
    const page = require('./timesheets.page');
    beforeAll(() => page.load());

    it('should have a time entry screen', () => {
        expect($('h2').getText()).toEqual('May 1 - 15');
    });

    it('should  not be able to enter time until job code is selected', () => {
        page.forAllInputFields(field => {
            expect(field.isEnabled()).toBe(true);
        });
    });

    it('should enter time and show accurate totals for a day', () => {

    });

    it('should enter time and show accurate totals for a specific job code', () => {

    });

    it('should save the entered time and show save success message', () => {

    });
});
