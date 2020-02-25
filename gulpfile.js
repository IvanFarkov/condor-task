const {src, dest, watch, series, parallel, gulp} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const files = {
	scssPath: 'app/scss/**/*.scss',
	jsPath: 'app/js/**/*.js',
	hmtlPath: 'index.html'
}

function htmlTask() {
	return src(files.hmtlPath)
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(dest('dist'));
}




function scssTask() {
	return src(files.scssPath)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([ autoprefixer(), cssnano() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'));
}

function jsTask() {
	return src(files.jsPath)
		.pipe(concat('allScript.js'))
		.pipe(uglify())
		.pipe(dest('dist'));
}

const cbString = new Date().getTime();
function cacheBustTask() {
	return src(['index.html'])
	.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
	.pipe(dest('.'));
}

function watchTask() {
	watch([files.scssPath, files.jsPath, files.hmtlPath],
		parallel(scssTask, jsTask, htmlTask));
}

exports.default = series(
	parallel(scssTask, jsTask, htmlTask),
	cacheBustTask,
	watchTask
);