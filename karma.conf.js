// Karma configuration
// Generated on Mon May 18 2015 17:46:25 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
	  {pattern: 'public/app/**/test/*.test.js', included: false},
	  {pattern: 'public/app/**/*.js', included: false},
	  {pattern: 'public/app/**/*.json', included: false},
	  {pattern: 'public/vendor/**/*.js', included: false},
      { pattern: 'public/app/**/*.html', included: false },
      'test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'public/app/main.js',
      'public/vendor/**/test/**/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/app/*.js': ['coverage'],
      'public/app/**/*.js': ['babel'],
      'public/app/**/!(test)/*.js': ['coverage'],
      'public/app/**/tests/!(mocks)/*.js': ['coverage'],
      'public/app/**/*.html': ['ng-html2js']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      //filename: function (file) {
      //  return file.originalPath.replace(/\.js$/, '.es5.js');
      //},
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'PhantomJS2',
    //    'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
