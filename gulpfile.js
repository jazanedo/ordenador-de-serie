//////////////////////
//// DEPENDENCIES ////
//////////////////////
var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*']
  });

var wiredep = require('wiredep').stream;
var nib = require('nib');






///////////////
//// RUTAS ////
///////////////
var paths = {
  stylus: 'source/stylus/*.styl',
  js: 'source/js/modules/*.js',
  jsPlugins: 'source/js/vendor/*.js',
  images: 'source/images/',
  files: 'source/files/',
  source: 'source/',
  jade: 'source/jade/',
  output: 'dist/'
};






//////////////
//// HTML ////
//////////////
gulp.task('html', function() {
  return gulp.src(paths.output + '*.html')
    .pipe($.livereload());
});





////////////////
//// STYLUS ////
////////////////
gulp.task('sourceStylus', function() {
  return gulp.src([paths.stylus])
    .pipe($.stylus({
      use: nib()
    }))
    .pipe(gulp.dest(paths.output + 'css'))
    .pipe($.livereload());
});
gulp.task('releaseStylus', function() {
  return gulp.src([paths.stylus])
    .pipe($.stylus({
      compress: true
    }))
    .pipe(gulp.dest(paths.output + 'css'));
});
gulp.task('cssPlugins', function() {
  return gulp.src(paths.source + 'stylus/vendor/*.css')
    .pipe($.concatCss("css/plugins.css"))
    .pipe($.csso())
    .pipe(gulp.dest(paths.output));
});






////////////////////
//// JAVASCRIPT ////
////////////////////
gulp.task('sourceJs', function() {
  return gulp.src(paths.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest(paths.output + 'js'))
    .pipe($.livereload());
});
gulp.task('releaseJs', function() {
  return gulp.src(paths.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('scripts.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.output + 'js'));
});
gulp.task('sourceJsPlugins', function() {
  return gulp.src(paths.jsPlugins)
    .pipe($.concat('plugins.js'))
    .pipe(gulp.dest(paths.output + 'js'))
    .pipe($.livereload());
});
gulp.task('releaseJsPlugins', function() {
  return gulp.src(paths.jsPlugins)
    .pipe($.concat('plugins.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.output + 'js'));
});






////////////////
//// IMAGES ////
////////////////
gulp.task('sourceImages', function() {
  return gulp.src(paths.images + '**/*')
    .pipe(gulp.dest(paths.output + 'images'))
    .pipe($.livereload());
});
gulp.task('releaseImages', function() {
  return gulp.src(paths.images + '*')
    .pipe($.imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest(paths.output + 'images'));
});
gulp.task('sprite', function() {
  var spriteData =
    gulp.src(paths.images + 'ico/*.png')
    .pipe($.spritesmith({
      //retinaSrcFilter: paths.images + 'ico/*@2x.png', // <<<<<< FOR RETINA DISPLAYS
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      //retinaImgName: 'sprite2x.png', // <<<<<< FOR RETINA DISPLAYS
      //retinaImgPath: '../images/sprite2x.png', // <<<<<< FOR RETINA DISPLAYS
      cssName: 'sprite.styl',
      cssFormat: 'stylus',
      algorithm: 'binary-tree'
    }));

  spriteData.img.pipe(gulp.dest(paths.images));
  spriteData.css.pipe(gulp.dest(paths.source + 'stylus/sprite/'));
});






///////////////
//// FILES ////
///////////////
gulp.task('files', function() {
  return gulp.src(paths.files + '**/*.*')
    .pipe(gulp.dest(paths.output + 'files'))
    .pipe($.livereload());
});






/////////////////////////////
//// CLEAN OUTPUT FOLDER ////
/////////////////////////////
gulp.task('clean', ['cleanCss'], function() {
  return gulp.src(paths.output + 'files', {
      read: false
    })
    .pipe($.clean());
});
gulp.task('cleanCss', ['cleanJs'], function() {
  return gulp.src(paths.output + 'css', {
      read: false
    })
    .pipe($.clean());
});
gulp.task('cleanJs', function() {
  return gulp.src(paths.output + 'js', {
      read: false
    })
    .pipe($.clean());
});


/////////////////////
//// JADE ///////////
/////////////////////

gulp.task('jade', function() {
    return gulp.src(paths.jade + '*.jade')
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.output))
        .pipe(browserSync.reload({stream:true}));
});


/////////////////////
//// DEFAUL TASK ////
/////////////////////
gulp.task('default', ['source'], function() {
  $.livereload.listen();

  gulp.watch([paths.source + 'stylus/**/*.*'], ['sourceStylus']);
  gulp.watch([paths.source + 'stylus/vendor/*.*'], ['cssPlugins']);
  gulp.watch([paths.source + 'js/modules/*'], ['sourceJs']);
  gulp.watch([paths.source + 'js/vendor/*'], ['sourceJsPlugins']);
  gulp.watch([paths.source + 'images/*'], ['sourceImages']);
  gulp.watch([paths.source + 'images/ico/*.*'], ['sprite']);
  gulp.watch([paths.source + 'files/*.*'], ['files']);
  gulp.watch([paths.output + '*.html'], ['html']);
});


gulp.task('browser-sync', ['jade'], function() {
    browserSync({
        server: {
            baseDir: "."
        }
    });

    gulp.watch(paths.jade + "*.jade", ['jade']);
    gulp.watch(paths.jade + "partials/*.jade", ['jade']);
    // Todas las tareas
});


//////////////////////
//// SOURCE TASKS ////
/////////////////////
gulp.task('source', ['sourceStylus', 'cssPlugins', 'sourceJs', 'sourceJsPlugins', 'sourceImages', 'sprite', 'files','browser-sync', 'jade']);



//////////////////////
//// RELEASE TASKS ////
/////////////////////
gulp.task('release', ['releaseStylus', 'releaseJs', 'releaseJsPlugins', 'releaseImages', 'files']);
