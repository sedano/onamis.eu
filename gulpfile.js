var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Onamis EU - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.owner %>\n',
    ' * Licensed under <%= pkg.license%>\n',
    ' * Developed by <%= pkg.author%>\n',
    ' */\n\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function () {
    return gulp.src('less/new-age.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
    return gulp.src('css/new-age.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src('js/new-age.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy libraries from /node_modules into /lib
gulp.task('copy', function () {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('lib/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('lib/jquery'))

    gulp.src(['node_modules/particles.js/particles.js'])
        .pipe(gulp.dest('lib/particles'))

    gulp.src(['node_modules/simple-line-icons/*/*'])
        .pipe(gulp.dest('lib/simple-line-icons'))

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('lib/font-awesome'))
})

// Run everything
gulp.task('default', ['sw', 'less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function () {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

// Serve task with browserSync
gulp.task('serve', ['browserSync'], function () {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

// Generate Service Worker
gulp.task('sw', function (callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = '.';

    swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [
            `${rootDir}/*.html`,
            `${rootDir}/{css,img,js}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`,
            `${rootDir}/lib/{bootstrap,font-awesome,jquery,particles,simple-line-icons}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2,json}`,
            `${rootDir}/lib/device-mockups/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`,
            `${rootDir}/lib/device-mockups/iphone_6_plus/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`
        ],
        ignoreUrlParametersMatching: [/./],
        stripPrefix: rootDir
    }, callback).then(OneSignalUpdate);
});

//Add version to OneSignalSDKWorker to trigger update
var OneSignalUpdate = function () {
    return gulp.src(['OneSignalSW.js'])
        .pipe(header('// Onamis EU - v<%= pkg.version %>\n', { pkg: pkg }))
        .pipe(rename('OneSignalSDKWorker.js'))
        .pipe(gulp.dest('.'))
};