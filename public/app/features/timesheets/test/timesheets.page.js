'use strict';
const Page = require('../../../../test/page-object.class');
const _ = require('lodash');

class Timesheet extends Page {
    constructor() {
        super();
        this.url = '/#!/timesheets';
    }

}

module.exports = new Timesheet();
