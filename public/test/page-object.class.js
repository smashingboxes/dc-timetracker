'use strict';

class Page {
    constructor() {
        this.url = browser.baseUrl;
    }

    login(username = browser.params.username, password = browser.params.password) {
        browser.get(`${browser.baseUrl}#!/login`);
        element(by.model('auth.email')).sendKeys(username);
        element(by.model('auth.password')).sendKeys(password);
        element(by.buttonText('Sign in')).click();
    }

    load() {
        console.log('LOAGING: ', this.url);
        browser.get(this.url);
    }
}

module.exports = Page;
