var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    kraken       = require('gulp-kraken'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    pngquant     = require('imagemin-pngquant'),
    rimraf       = require('gulp-rimraf'),
    browserSync  = require('browser-sync'),
    svgSprite    = require('gulp-svg-sprite'),
    notify       = require('gulp-notify'),
    eslint       = require('gulp-eslint'),
    babel        = require('gulp-babel'),
    order        = require('gulp-order'),
    rev          = require('gulp-rev'),
    revReplace   = require('gulp-rev-replace');

var config = {
    mode: {
        symbol: { // Symbol mode
            render: {
                css: false, // CSS for icon sizing
                scss: false // SCSS for icon sizing
            },
            dimension: { // Set maximum dimensions
                width: 42,
                height: 42
            },
            dest: './', // Destination folder
            sprite: 'all-sprite.svg', // Sprite name
            example: true // Sample page
        }
    }
};

gulp.task('svg', (done) => {
    return gulp.src('img/svg/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('img/svg/'));
        done();
});


gulp.task('minify_images', (done) => {

    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'))
        .pipe(notify('Images Compressed'));
        done();

});


gulp.task("revreplace", (done) => {
    var manifest = gulp.src("./" + 'dist/' + "/rev-manifest.json");

    gulp.src('src' + "/index.html")
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('revrepl'));
        done();
});


gulp.task('clear_scripts', (done) => {
    return gulp.src('dist/js/**/*.*')
        .pipe(rimraf());
        done();
});
gulp.task('clear_styles', (done) => {
    return gulp.src('dist/css/**/*.*')
        .pipe(rimraf());
        done();
});
gulp.task('clear_index', (done) => {
    return gulp.src('dist/*.html')
        .pipe(rimraf());
        done();
});
gulp.task('lint', (done) => {
    return gulp.src(['src/js/scripts.babel.js', '!node_modules/**'])
        .pipe(eslint({
            configFile: 'eslintrc.json'
        }))
        .pipe(eslint.format());
        done();
});

gulp.task('generate_styles', gulp.parallel('clear_styles', 'clear_index', (done) => {

    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 10 versions', 'ie 9'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            base: process.cwd() + '/dist',
            merge: true
        }))
        .pipe(gulp.dest('./dist'))
}));
gulp.task('compress_javascript', gulp.parallel('clear_scripts', 'clear_index', 'lint', (done) => {

    return gulp.src('src/js/**/*.js')
        .pipe(order([
            'src/js/**/*.js',
            'src/js/scripts.babel.js'
        ]))
        .pipe(babel({
            presets: ['es2015'],
            ignore: './src/js/lib'
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            base: process.cwd() + '/dist',
            merge: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Javascript Minified and Concatenated'))
}));

gulp.task('generate_js', () => {
    gulp.watch(['src/js/**/*.js'], gulp.series('compress_javascript', 'revreplace' ));
});

gulp.task('generate_css', () => {
    gulp.watch(['src/scss/**/*.scss'], gulp.series('generate_styles', 'revreplace'));
});

gulp.task('watch_html', () => {
    gulp.watch(['src/*.html'], gulp.series('revreplace'));
});

gulp.task('watch_images', () => {
    gulp.watch(['src/img/**/*.*'], gulp.series('minify_images', 'svg'));
});

gulp.task('watch', gulp.parallel('generate_js', 'generate_css', 'watch_html', 'watch_images'));
