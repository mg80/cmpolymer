// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


//  Copy bootstrap min CSS
gulp.task('bootstrapcss', function() {
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//  Copy bootstrap min JS
gulp.task('bootstrapjs', function() {
    return gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(concat('bootstrap.min.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy jquery
gulp.task('jquery', function() {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(concat('jquery.min.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy webcomponents
gulp.task('webcomponents', function() {
    return gulp.src('bower_components/webcomponentsjs/webcomponents.js')
        .pipe(concat('webcomponents.js'))
        .pipe(gulp.dest('dist/js'));
});

//  Copy css
gulp.task('srccss', function() {
    return gulp.src('src/styles/*.css')
        .pipe(concat('src.css'))
        .pipe(gulp.dest('dist/styles'));
});


gulp.task('css', ['bootstrapcss', 'srccss']);
gulp.task('js', ['bootstrapjs', 'scripts', 'jquery', 'webcomponents']);


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'js']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'js', 'watch', 'css']);