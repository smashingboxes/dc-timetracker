var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/public/app',
  paths: {
    //vendor
    angular: '../vendor/angular/angular',
    angularResource: '../vendor/angular-resource/angular-resource',
    angularRoute: '../vendor/angular-route/angular-route',
    angularSanitize: '../vendor/angular-sanitize/angular-sanitize',
    angularAnimate: '../vendor/angular-animate/angular-animate',
    angularCookies: '../vendor/angular-cookies/angular-cookies',
    angularMocks: '../vendor/angular-mocks/angular-mocks',
    lodash: '../vendor/lodash/lodash',
    angularScroll: '../vendor/angular-scroll/angular-scroll',
    moment: '../vendor/moment/moment',
    angularAria: '../vendor/angular-aria/angular-aria',
    angularMaterial: '../vendor/angular-material/angular-material',
    angularMessages: '../vendor/angular-messages/angular-messages',
    mdPickers: '../vendor/mdPickers/dist/mdPickers',
    satellizer: '../vendor/satellizer/dist/satellizer.min',
    ipCookie: '../vendor/angular-cookie/angular-cookie',
    ngTokenAuth: '../vendor/ng-token-auth/dist/ng-token-auth.min',
  },
  shim: {
    angular: { exports: 'angular' },
    angularResource: { deps: [ 'angular' ] },
    angularRoute: { deps: [ 'angular' ] },
    angularSanitize: { deps: [ 'angular' ] },
    angularAnimate: { deps: [ 'angular' ] },
    angularAria: { deps: ['angular'] },
    angularMocks: { deps: [ 'angular' ] },
    angularCookies: { deps: [ 'angular' ] },
    angularScoll: { deps: [ 'angular' ] },
    angularMessages: { deps:['angular'] },
    angularMaterial: { deps: ['angular'] },
    mdPickers: { deps: ['angular', 'moment'] },
    satellizer: { deps: ['angular'] },
    ipCookie: { deps: ['angular'] },
    ngTokenAuth: { deps: ['angular', 'ipCookie'] },
    lodash: {
      exports: '_'
    }
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
