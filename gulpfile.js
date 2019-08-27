var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(reload({stream: true}));
})

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
})

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
    .pipe(reload({stream: true}));
})

gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: 'app',
        },
        notify: false
    });
})

gulp.task('watch', function(){
    gulp.watch('app/js/main.js', gulp.series('js'));
   gulp.watch('app/*.html', gulp.series('html'));
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('start', gulp.parallel('watch', 'browser-sync'));