var gulp = require('gulp');
var uglify = require("gulp-uglify");
var htmlminify = require('gulp-html-minify');
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var babel = require('gulp-babel')
gulp.task('js', function () {

    return gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['es2015'] // es5检查机制
        }))
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./dist/js'))

});
gulp.task('css', function () {

    return gulp.src('./css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))


});
gulp.task('html', function () {

    return gulp.src('index.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist'))

});
gulp.task('html1', function () {

    return gulp.src('./html/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist/html'))
});
gulp.task('img', function () {

    return gulp.src('./image/*.{jpg,png,gif,ico,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/image'))//不压缩
});


gulp.task('default', gulp.series([
    'js',
    'css',
    'html',
    'html1',
    'img',
], function () {
    console.log('压缩完成');
}));
