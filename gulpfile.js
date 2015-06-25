var gulp = require('gulp');
var babel = require('gulp-babel');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');


gulp.task('dist:all', ['lb-ng'], function() {
  return gulp.src(['client/**', '!client/scripts/*.js']).pipe(gulp.dest('dist'));
});

gulp.task('dist:babel:all', ['dist:all'], function () {
  return gulp.src(['client/**/*.js', '!client/vendor/**'], { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts/all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:babel', ['dist:all', 'dist:vendor', 'lb-ng'], function () {
  return gulp.src(['client/**/*.js', '!client/vendor/**'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:vendor', ['dist:all'], function() {
  return gulp.src('client/index.html')
    .pipe(usemin({js: ['concat']}))
    .pipe(gulp.dest('dist'));
});

gulp.task('lb-ng', [], shell.task([
  'node node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js ' +
  'client/vendor/loopback-services.js'
]));

gulp.task('server:env', shell.task([
  'node utils/setup.js'
]));

gulp.task('dist', ['dist:all', 'lb-ng', 'dist:vendor', 'dist:babel']);

gulp.task('watch', function() {
  return gulp.watch('client/**', ['dist']);
});

gulp.task('server', ['dist', 'server:env'], shell.task([
  'node server/server.js'
]));

gulp.task('test', ['dist', 'dist:babel:all'], shell.task([
  'node_modules/intern/bin/intern-runner.js config=tests/intern'
]));

gulp.task('default', ['watch', 'dist', 'server']);
