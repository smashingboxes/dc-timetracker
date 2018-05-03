'use strict';
const Page = require('../../../../test/page-object.class');
const _ = require('lodash');

class Timesheet extends Page {
    constructor() {
        super();
        this.url = '/#!/timesheets';
        this.inputFields = $$('input');
    }

   forAllInputFields(cb) {
        this.fields.each(field => cb(field));
   }

}

module.exports = new Timesheet();
