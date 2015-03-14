var gulp = require('gulp');
var babel = require('gulp-babel');
var shell = require('gulp-shell');


gulp.task('dist:all', function() {
  return gulp.src('client/**').pipe(gulp.dest('dist'));
});

gulp.task('dist:babel', function () {
  return gulp.src(['client/**/*.js', '!client/vendor/**'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:lb-ng', ['dist:all'], shell.task([
  'node node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js ' +
  'dist/vendor/loopback-services.js'
]));

gulp.task('server:env', shell.task([
  'node utils/setup.js'
]));

gulp.task('dist', ['dist:all', 'dist:babel', 'dist:lb-ng']);

gulp.task('watch', function() {
  return gulp.watch('client/**/*.js', ['dist:babel']);
});

gulp.task('server', ['dist', 'server:env'], shell.task([
  'node server/server.js'
]));

gulp.task('default', ['watch', 'dist', 'server']);
