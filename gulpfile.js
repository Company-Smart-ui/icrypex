const gulp         = require('gulp'),           
			sass         = require('gulp-sass')(require('sass')),         
			browserSync  = require('browser-sync'),     
			cssnano      = require('gulp-cssnano'),    
			del          = require('del'),            
			cache        = require('gulp-cache'),     
			autoprefixer = require('gulp-autoprefixer'),    
			concat = require('gulp-concat'),        
			htmlreplace = require('gulp-html-replace'),
			pug = require('gulp-pug'),
			gcmq = require('gulp-group-css-media-queries');




gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src(['app/js/main.js', 'app/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('pug', function() {
	return gulp.src('app/pug/pages/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', function() { 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function () {
	return cache.clearAll();
})


gulp.task('clean', function() {
	return del.sync('dist');
});


gulp.task('buildHtml', function() {
	return gulp.src('app/*.html')
	.pipe(htmlreplace({
		'css_main': 'css/style.min.css',
		'js': 'js/main.js'
	}))
	.pipe(gulp.dest('dist'))
});

gulp.task('buildFonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('buildCss', function() {
	return gulp.src('app/css/*.css', '!app/css/libs/*.css')
	.pipe(concat('style.css'))
	.pipe(gcmq())
	.pipe(gulp.dest('dist/css/'))
	.pipe(cssnano({autoprefixer: {
		browsers:['last 50 versions', '> 1%', 'ie 8', 'ie 7'], 
		add: true
	}}))	
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'))
});

gulp.task('buildJs', function() {
	return gulp.src('app/js/main.js')
	.pipe(gulp.dest('dist/js'))
});


gulp.task('buildCssLibs', function() {
	return gulp.src('app/css/libs/*.css')
	.pipe(gulp.dest('dist/css/libs'))
});

gulp.task('buildLibs', function() {
	return gulp.src('app/libs/**/*')
	.pipe(gulp.dest('dist/libs'))
});

gulp.task('b', gulp.parallel('clean', 'img', 'buildHtml', 'buildCss', 'buildCssLibs', 'buildJs', 'buildFonts', 'buildLibs'));


gulp.task('watch', function() {
	gulp.watch(['app/scss/**/*.scss'], gulp.parallel('scss'));
	gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
	gulp.watch(['app/js/**/*.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});


gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));
