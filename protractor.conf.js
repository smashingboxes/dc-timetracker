'use strict';

var argv = require('yargs').argv;
var glob = require('glob');
var seleniumJar = glob.sync('node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone*.jar')[0];
var geckoDriver = glob.sync('node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver*')[0];
var chromeDriver = glob.sync('node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver*')[0];
glob.pattern = null;
glob.files = [];

exports.config = {

    chromeDriver: chromeDriver,

    chromeOnly: false,
    seleniumAddress: argv.params.seleniumAddress === 'null' ? null : argv.params.seleniumAddress,
    seleniumServerJar: seleniumJar,
    localSeleniumStandaloneOpts: {
        jvmArgs: [
                '-Dwebdriver.gecko.driver=' + geckoDriver
        ]
    },

    allScriptsTimeout: 120000,

    exclude: [],

    capabilities: {
        browserName: 'firefox',
        marionette: true,
        shardTestFiles: argv.params.singleRun === 'false',
        maxInstances: argv.params.singleRun !== 'false' ? 1 : 6
        chromeOptions: {
            args: [
                '--start-maximized'
            ]
        }
    },

    rootElement: 'body',

    onPrepare: function() {
        let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        //adding jasmine html reporter
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './reports/',
                screenshotsFolder: 'images',
                filePrefix: 'Planurai-Report',
                consolidate: true,
                consolidateAll: true
            })
        );

        let EC = protractor.ExpectedConditions;

        browser.driver.manage().window().maximize();

        browser.get(browser.baseUrl);
        element(by.model('login.username')).sendKeys(browser.params.username);
        element(by.model('login.password')).sendKeys(browser.params.password);
        element(by.buttonText('Log in')).click();
        browser.wait(EC.presenceOf(element(by.css('div.authenticated'))),15000);


    },

    framework: 'jasmine2',

    jasmineOpts: {
        ui: 'bdd',
        reporter: 'spec-reporter'
    },

    onCleanUp: function() {},

    jasmineNodeOpts: {
        silent: true,
        defaultTimeoutInterval:300000,
        print: function() {}
    }
};

