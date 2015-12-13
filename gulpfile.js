// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bower = require('gulp-bower');

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//  Copy bootstrap min CSS
gulp.task('bootstrap-css', function () {
    return gulp.src('lib/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//  Copy bootstrap min JS
gulp.task('bootstrap-js', function () {
    return gulp.src('lib/bootstrap/dist/js/bootstrap.min.js')
        .pipe(concat('bootstrap.min.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy jquery
gulp.task('jquery', function () {
    return gulp.src('lib/jquery/dist/jquery.min.js')
        .pipe(concat('jquery.min.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy webcomponents
gulp.task('web-components', function () {
    return gulp.src('lib/webcomponentsjs/webcomponents.js')
        .pipe(concat('webcomponents.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy css
gulp.task('src-css', function () {
    return gulp.src('src/styles/*.css')
        .pipe(concat('src.css'))
        .pipe(gulp.dest('dist/styles'));
});

//run bower and move stuff to lib
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('lib'));
});

gulp.task('css', ['bootstrap-css', 'src-css']);
gulp.task('js', ['bootstrap-js', 'scripts', 'jquery', 'web-components']);

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['lint', 'js']);
});

// Default Task
gulp.task('default', ['js', 'watch', 'css', 'bower']);