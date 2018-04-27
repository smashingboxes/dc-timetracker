var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var lessglob = require('less-plugin-glob');
var autoprefix = require('gulp-autoprefixer');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');
var copy = require('gulp-copy');
var Server = require('karma').Server;
var requirejs = require('requirejs');
var ngAnnotate = require('ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var jscs = require('gulp-jscs');
var htmlreplace = require('gulp-html-replace');
var fs = require('fs');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var protractor = require('gulp-protractor').protractor;
var connect = require('gulp-connect');
var open = require('gulp-open');
var shell = require('gulp-shell');
var bump = require('gulp-bump');

var baseUrl = argv.baseUrl || 'http://localhost:3000';
var username = argv.username || 'user1';
var password = argv.password || '';
var browser = argv.browser || 'firefox';
var runAs = argv['run-as'] || 'user';
var env = argv.env;
var singleRun = argv['single-run'];

var getVersion = function() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

//Initialize version string
var version = getVersion();

var appRoot = 'public/app/';
var build = 'deploy';

var paths = {
  js: [
    appRoot + '*.js',
    appRoot + '**/*.js',
    '!' + appRoot + '../vendor/**/*.js',
    '!' + appRoot + '**/*.test.js',
    '!' + appRoot + '**/*.e2e.js',
    '!' + appRoot + '**/*.page.js',
    '!' + appRoot + '**/*.component.js'
  ],
  css: appRoot + '../assets/css/*.css',
  main_css: appRoot + '../assets/css/main.css',
  html: appRoot + '**/*.html',
  images: appRoot + '../assets/images/**/*',
  docroot: build + '/app',
  fonts: [
    appRoot + '../assets/fonts/*',
    appRoot + '**/*.eot',
    appRoot + '**/*.svg',
    appRoot + '**/*.ttf',
    appRoot + '**/*.woff',
    appRoot + '**/*.woff2',
  ],
  components: [
    appRoot + 'components/*.js',
    appRoot + 'components/**/*.js',
    '!' + appRoot + '**/*.test.js',
    '!' + appRoot + '**/*.e2e.js'
  ],
  templates: [
    appRoot + '**/*.html',
    '!' + appRoot + 'index.html'
  ],
  build: {
    css: '../assets/css',
    images: '../assets/images',
    fonts: '../assets/fonts',
    js: 'main'
  },
  // what CSS files to concat and minify for solutionmatrix.min.css
  index: 'app/views/layouts/application.html.erb ',
  less: [
      appRoot + '**/*.less',
      'public/less/*.less'
  ],
  watchLess: [
    appRoot + 'assets/less/*.less',
    appRoot + '**/*.less'
  ],
  e2e: [
      appRoot + 'features/**/test/*.e2e.js'
  ],
  unit: [
      appRoot + 'test/*.test.js',
      appRoot + '**/test/*.test.js'
  ],
  vendorStyles: [
      'app/vendor/**/*.css',
      'app/vendor/**/*.css.map'
  ]
};

gulp.task('serve', ['less'], function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('start-server', shell.task(['./start-server.sh']));

gulp.task('open', ['start-server'], function() {
    return gulp.src(__filename)
    .pipe(open({
        uri: 'http://localhost:2020',
        app: browser
    }));
});

gulp.task('default', ['open', 'watch']);


// runs the build whenever one of our custom JavaScript or CSS files changes
gulp.task('watch', function () {
  var watchFiles = paths.js.concat(paths.less, paths.unit);
    console.log(watchFiles);
  gulp.watch(watchFiles, ['less', 'test']);
});

//deleted the build artifact folder
gulp.task('clean', function () {
  return gulp.src(build, {read: false})
    .pipe(clean());
});

gulp.task('copy-css-images', function() {
  return gulp.src([
    appRoot + 'vendor/jquery-ui/themes/base/images/*'
  ])
    .pipe(gulp.dest(appRoot + paths.build.css + '/images/'));
});

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.docroot + '/' + paths.build.images + '/'));
});

gulp.task('copy-vendor-styles', function() {
  return gulp.src(paths.vendorStyles)
    .pipe(gulp.dest(paths.docroot + '/vendor/'));
});

//compile less files into main CSS
gulp.task('less', ['copy-css-images'], function() {
  return gulp.src(paths.less)
    .pipe(less({
      plugins: [lessglob],
      paths: __dirname
    }))
    .pipe(autoprefix())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(appRoot + paths.build.css));
});

//may want to update
gulp.task('gather-templates', function (){
  var TEMPLATE_HEADER = 'define(["angular", "app"], function(angular, app) { return app.run(function($templateCache) {',
    TEMPLATE_FOOTER = '});});';

  return gulp.src(paths.templates)
    .pipe(templateCache({
      templateHeader: TEMPLATE_HEADER,
      templateFooter: TEMPLATE_FOOTER
    }))
    .pipe(gulp.dest(build));
});

gulp.task('minify-js', ['gather-templates'], function(cb) {
  console.log('Minifying JavaScript files ...');

  requirejs.optimize({
    name: 'main',
    mainConfigFile: appRoot + 'main.js',
    basePath: appRoot,
    optimize: 'uglify2',
    uglify2: { mangle: true },
    insertRequire: [ 'main' ],
    include: [ '../../deploy/templates', '../vendor/requirejs/require' ],
    paths: {
      ckeditor: "empty:"
      //highcharts: "empty:"
    },
    onBuildRead: function(moduleName, path, contents) {
      if (moduleName === 'main') {
        contents = contents.replace(/define\(\'main\'\,(\s*)\[(\s*)\'angular\',(\s*)/, 'define(\'main\', [\'angular\', \'../../deploy/templates\',');
      }

      return ngAnnotate(contents, { add: true, remove: false }).src;
    },
    out: paths.docroot + '/' + paths.build.js + '-v' + version + '.js'
  }, function() { cb(); });
});

gulp.task('minify-css', ['less'], function() {
  console.log('Minifying CSS files...');
  return gulp.src(paths.css)
    .pipe(minifyCSS())
    .pipe(rename(function (path) {
      path.basename += '-v' + version;
      return path;
    }))
    .pipe(gulp.dest(paths.docroot + '/' + paths.build.css));
});

gulp.task('copy-requirejs', function() {
  return gulp.src(appRoot + 'vendor/requirejs/require.js')
    .pipe(gulp.dest(paths.docroot + '/vendor/requirejs'));
});

gulp.task('imagemin', function() {
  console.log('Minifying Images files...');
  return gulp.src(paths.images)
  //.pipe(imagemin())
    .pipe(gulp.dest(paths.docroot + '/' + paths.build.images));
});

gulp.task('copy-fonts', function() {
  console.log('Copying Fonts files...');
  return gulp.src(appRoot + 'assets/fonts/**/*')
    .pipe(gulp.dest(paths.docroot + '/' + paths.build.fonts));
});

//Run unit tests
gulp.task('unit', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//Run JSCS
gulp.task('jscs', function() {
  console.log('running JSCS...');
  return gulp.src(paths.js)
    .pipe(jscs())
    .pipe(jscs.reporter());
});


// lints files and parks at you if you did something bad
gulp.task('jshint', function() {
  console.log('running JSHint...');
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', [
  'jshint',
  'jscs',
  'unit'
]);

gulp.task('copy-csv-reporter', function() {
  return gulp.src('./jasmine-csv-reporter/**/*', { base: '.' })
    .pipe(gulp.dest('./node_modules/'));
});

gulp.task('e2e', ['copy-csv-reporter'], function() {
  return gulp.src(['./nothing'])
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      keepAlive: true,
      args: [
        '--baseUrl', baseUrl,
        '--params.username', username,
        '--params.password', password,
        '--params.browser', browser,
        '--params.singleRun', singleRun,
        '--specs', paths.e2e
      ]
    }))
    .on('end', function() {
      console.log('E2E Testing complete');
      process.exit();
    })
    .on('error', function(error) {
      console.log('E2E Tests failed');
      process.exit(1);
    });
});

gulp.task('bump:major', function() {
  var stream = gulp.src('./package.json')
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));

  stream.on('end', function() {
    version = getVersion();
  });

  return stream;
});

gulp.task('bump:minor', function() {
  var stream = gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));

  stream.on('end', function() {
    version = getVersion();
  });

  return stream;
});


gulp.task('bump:patch', function() {
  var stream = gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest('./'));

  stream.on('end', function() {
    version = getVersion();
  });

  return stream;

});

gulp.task('deploy-css-and-images', ['minify-css'], function() {
  return gulp.src(appRoot + paths.build.css + '/images/*')
    .pipe(gulp.dest(paths.docroot + '/' + paths.build.css + '/images/'));
});


gulp.task('copy-index', function() {
  return gulp.src(paths.index)
    .pipe(htmlreplace({
      js: '<script src="app/main-v' + version + '.js"></script>',
      maincss: '<link rel="stylesheet" href="assets/css/main-v' + version + '.css" />',
      appVersion: '<!-- App Version: ' + version + '-->'
    }))
    .pipe(gulp.dest(paths.docroot));
});

gulp.task('build', [
    'minify-js',
    'deploy-css-and-images',
    'imagemin',
    'copy-index',
    'copy-requirejs',
    'copy-images',
    'copy-vendor-styles'
], function() {
  console.log('Building UI app to ' + paths.ui + '/ui.tar');
  return gulp.src([
    paths.docroot + '/**/*',
    '!' + paths.docroot + '/templates.js'
  ])
    .pipe(tar('ui-v' + version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('./'));
});
