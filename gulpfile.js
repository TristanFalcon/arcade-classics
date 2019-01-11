const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('message', function(){
    return new Promise(function(resolve, reject) {
        console.log('gulp running');
        resolve();
    }); 
});

