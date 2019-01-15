
/**
 * This is the gulpfile.js, this file contains all gulp related plugins, tasks, and functions. 
 * This file is used to automate tasks during development.
 * 
 * Structure:
 *     > plugins
 *     > file path variables
 *     > functions
 *     > tasks
 * 
 * @author Tristan Falcon 
 **/

/******************************************* gulp and gulp plugins ***************************************/
// load Gulp
const gulp = require( 'gulp' );

// css related plugins 
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );

// js related plugins 
const uglify = require( 'gulp-uglify' );
const babelify = require('babelify');
const browserify = require('browserify');
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );

// browser related plugins
const browserSync = require( 'browser-sync' ).create();

// utility plugins
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );

/******************************************* file paths ***************************************/
// project root path, relative to gulpfile.js
const root = '../../../';

// path to all.html pages in build directory 
const htmlWatch = root + 'build/*.html';

// path to build folder from project root
const buildFolder = root + '/build';

// path to main.scss in src directory 
const styleSRC = root + 'src/styles/main.scss';
// path to main.min.css in build directory 
const styleDIST = root + 'build/styles/';
// path to all .scss files in src directory
const styleWatch = root + 'src/styles/**/*.scss';

// path to app.js in src directory
const scriptSRC = root + 'src/scripts/app.js';
// path to app.min.js in build directory 
const scriptDIST = root + 'build/scripts/scripts';
// path to all .js files in src directory 
const scriptWatch = root + 'src/scripts/modules/*.js';

/******************************************* functions ***************************************/
/**
* This is the set browser_sync function used to start the local host 
* @param done, passed to be used as a call back when function completes
*/
function browser_sync( done ) {
    browserSync.init({
        server: {
            baseDir: buildFolder
        }
    });
    // call done function to return call back that function has completed running
    done();
}

/**
* This is the reload function, used to update browser sync with current data
* @param done, passed to be used as a call back when function completes
*/
function reload( done ) {
    browserSync.reload();
    // call done function to return call back that function has completed running
    done();
}

/**
* This is the css function, used to compile main.scss code into css,
* minify the file, change the file name to include .min suffix,
* and export the content into main.min.cs under the build directory. 
* Changes are then injected into the browser to represent the style changes. 
*/
function css() {
    return gulp.src( styleSRC )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }) ) 
        .on( 'error', console.error.bind( console ) )
        .pipe( autoprefixer({ 
            browsers: ['last 2 versions'],
            cascade: false }) )
        .pipe( rename({ suffix: '.min' }))
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( styleDIST ))
        .pipe( browserSync.stream() );
};


/**
 * this is the js function, this function takes the app.js file and compiles 
 * it into plain java script that can be utilized across different/older browsers. 
 * The file is then minified, renamed to include the .min.js extension, and exported 
 * to the app.min.js file under the build directory. 
 * 
 */
function js() {
    return browserify({entries: [scriptSRC]})
        .transform( babelify, {presets: ['env']} )
        .bundle()
        .pipe( source( scriptSRC ) )
        .pipe( rename({ extname: '.min.js' }) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( scriptDIST ) )
        .pipe( browserSync.stream() );
};

/**
 * This is the watch_files function, this function tells gulp what files to watch 
 * and check for changes. 
 */
function watch_files() {
    gulp.watch( styleWatch, gulp.series(css));
    gulp.watch( scriptWatch, gulp.series(js));
    gulp.watch( htmlWatch, reload)
}

/******************************************* tasks ***************************************/
// calls css function 
gulp.task("css", css);
// calls js function
gulp.task("js", js);

// watch task, initializes browser sync and begins watching files
gulp.task( 'watch', gulp.parallel(browser_sync, watch_files));
// default task, updates css, js, and html in browser sync
gulp.task( 'default', gulp.parallel(css, js, reload));