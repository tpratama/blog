const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const compileLess = require('gulp-less');
const livereload = require('gulp-livereload');
const exec = require('child_process').exec;
const hash = require('./build-utils').getMostRecentHash();

const logger = console;

const distPath = path => `./dist/${hash}/${path}`;

const paths = {
  less: {
    source: './less/*.less',
    main: './less/main.less',
    outputDir: distPath('/styles'),
    outputFilename: 'index.css',
  },
};

gulp.task('less.build', () => {
  const compile = compileLess({ compress: false }).on('error', logger.error);
  const prefix = autoprefixer();

  return gulp.src(paths.less.main)
    .pipe(compile)
    .pipe(concat(paths.less.outputFilename))
    .pipe(prefix)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.less.outputDir))
    .pipe(livereload());
});

gulp.task('js.build', (callback) => {
  return exec('./node_modules/.bin/webpack', (err, stdout, stderr) => {
    logger.log(stdout);
    logger.error(stderr);
    callback(err);
  });
});

gulp.task('content.copy', () => {
  return gulp.src('./content/source/*')
    .pipe(gulp.dest('./dist/source'));
});

gulp.task('build', [
  'js.build',
  'less.build',
  'content.copy',
]);

gulp.task('default', ['build']);