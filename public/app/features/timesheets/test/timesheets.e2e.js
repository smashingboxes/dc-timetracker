'use strict';
describe('Time Management', () => {
    const page = require('./timesheets.page');
    beforeAll(() => page.load());

    it('should have a time entry screen', () => {
        expect($('h2').getText()).toEqual('May 1 - 15');
    });
});
