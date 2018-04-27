'use strict';
requirejs.config({
    paths: {
        angular: '../vendor/angular/angular',
        angularResource: '../vendor/angular-resource/angular-resource',
        angularRoute: '../vendor/angular-route/angular-route',
        angularSanitize: '../vendor/angular-sanitize/angular-sanitize',
        angularCookies: '../vendor/angular-cookies/angular-cookies',
        angularAnimate: '../vendor/angular-animate/angular-animate',
        angularAria: '../vendor/angular-aria/angular-aria',
        angularMaterial: '../vendor/angular-material/angular-material',
        lodash: '../vendor/lodash/lodash',
        moment: '../vendor/moment/min/moment.min',
        angularMessages: '../vendor/angular-messages/angular-messages',
        mdPickers: '../vendor/mdPickers/dist/mdPickers',
        satellizer: '../vendor/satellizer/dist/satellizer.min',
        app: 'app'

    },
    shim: {
        angular: { exports: 'angular' },
        angularResource: { deps: ['angular'] },
        angularRoute: { deps: ['angular'] },
        angularSanitize: { deps: ['angular'] },
        angularCookies: { deps: ['angular'] },
        angularAnimate: { deps: ['angular'] },
        angularAria: { deps: ['angular'] },
        angularScroll: { deps: ['angular'] },
        angularMessages: { deps: ['angular'] },
        angularMaterial: { deps: ['angular'] },
        moment: { exports: 'moment' },
        mdPickers: { deps: ['angular', 'moment'] },
        satellizer: { deps: ['angular'] },
        lodash: {
            exports: '_'
        }
    },
    waitSeconds: 60
});

define('main', ['angular',
        'app'
], angular => {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['flash']);
    });
});
