var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify');


gulp.task('default', ['compile','serve', 'engine']);

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve', function(){
    browserSync({
        server: 'project'
    })
    gulp.watch('project/*.html', ['reload']);
    gulp.watch(['./project/**/*.js', '!./project/**/*.min.js'], ['compile']);
})

gulp.task('compile', function(){
    gulp.src('project/src/start.js')
        .pipe(browserify({ insertGlobals: true }))
        .pipe(rename('game.min.js'))
        .pipe(gulp.dest('project/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('engine', function() {
	gulp.src([
			'node_modules/phaser-ce/build/phaser.min.js',
		])
		.pipe(rename('engine.min.js'))
		.pipe(gulp.dest('project/js'));
});
