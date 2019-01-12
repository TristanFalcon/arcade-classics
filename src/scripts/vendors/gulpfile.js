
const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' ).create();
const sass = require( 'gulp-sass' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const autoprefixer = require( 'gulp-autoprefixer' );
const sourcemaps = require( 'gulp-sourcemaps' );
const browserify = require('browserify');
const babelify = require('babelify');
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );


const root = '../../../';

const buildFolder = root + '/build';

const styleSRC = root + 'src/styles/main.scss';
const styleDIST = root + 'build/styles/';
const styleWatch = root + 'src/styles/**/*.scss';

const scriptSRC = root + 'src/scripts/app.js';
const scriptDIST = root + 'build/scripts/scripts';
const scriptWatch = root + 'src/scripts/modules/*.js';

const htmlWatch = root + 'build/*.html';

function browser_sync( done ) {
    browserSync.init({
        server: {
            baseDir: buildFolder
        }
    });
    done();
}

function reload( done ) {
    browserSync.reload();
    done();
}

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

function watch_files() {
    gulp.watch( styleWatch, gulp.series(css));
    gulp.watch( scriptWatch, gulp.series(js));
    gulp.watch( htmlWatch, reload)
}

gulp.task("css", css);
gulp.task("js", js);

gulp.task( 'watch', gulp.parallel(browser_sync, watch_files));
gulp.task( 'default', gulp.parallel(css, js));