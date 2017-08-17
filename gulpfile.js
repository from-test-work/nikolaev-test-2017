var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    csscomb = require('gulp-csscomb'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {

    src: {
        /* ===========================  JavaScript files    =========================== */
        js: {
            script: 'src/js/script.js',
            libs:   'src/js//libs/**/*.js'
        },
        /* ===========================  SCSS files  =========================== */
        scss: {
            style: [
                'src/scss/style.scss',
                'src/scss/_core/**/*.scss',
                'src/scss/_components/**/*.scss',
                'src/scss/_modules/**/*.scss',
                'src/scss/_helpers/**/*.scss'
            ],
            libs: 'src/scss/libs/**/*.scss'
        },
        /* ===========================  Pug files  =========================== */
        templates: 'src/templates/**/*.pug',
        /* ===========================  Images  =========================== */
        img: 'src/images/**/*.*',
        /* ===========================  Fonts  =========================== */
        fonts: 'src/scss/fonts/**/*.*',
    },

    dest: {
        /* ====  JavaScript files  ==== */
        js: {
            script: 'dest/js/',
            libs: 'dest/js/libs/'
        },
        /* ====  SCSS files  ==== */
        css: {
            style: 'dest/css/',
            libs: 'dest/css/libs/'
        },
        /* ====  Pug files  ==== */
        templates: 'dest/',
        /* ====  Images  ==== */
        img: 'dest/images/',
        /* ====  Fonts  ==== */   
        fonts: 'dest/css/fonts/'
    },

    clean: './dest'
};


/* ===========================  JavaScript files  =========================== */
function jsTask(taskName, src, dest, concatNameFile) {
    gulp.task(taskName, function () {
        gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat(concatNameFile))
            // .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest))
            .pipe(reload({stream: true}));
    });
}

gulp.task('dev-jsTransportLibs', function() {
    gulp.src(path.src.js.libs)
        .pipe(gulp.dest(path.dest.js.libs))
});

jsTask('dev-jsScript', path.src.js.script, path.dest.js.script, 'script.js');

/* ===========================  SCSS files  =========================== */
function scssTask(taskName, src, dest, name) {
    if (name !== undefined) {
        gulp.task(taskName, function () {
            gulp.src(src)
                .pipe(plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                }))
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(rename(name))
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'last 15 versions'],
                    cascade: false
                }))
                .pipe(plumber.stop())
                .pipe(notify("style.scss (DEV) compiled success!"))
                .pipe(sourcemaps.write())
                .pipe(csscomb())
                .pipe(gulp.dest(dest))
                .pipe(reload({stream: true}));
        });
    } else {
        gulp.task(taskName, function () {
            gulp.src(src)
                .pipe(plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                }))
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'last 15 versions'],
                    cascade: false
                }))
                .pipe(plumber.stop())
                .pipe(notify("style.scss (DEV) compiled success!"))
                .pipe(sourcemaps.write())
                .pipe(csscomb())
                .pipe(gulp.dest(dest))
                .pipe(reload({stream: true}));
        });
    }

}

scssTask('dev-sass', path.src.scss.style, path.dest.css.style, 'template_styles.css');
scssTask('dev-sass-libs', path.src.scss.libs, path.dest.css.libs);


/* ===========================  Templates files  =========================== */
gulp.task('dev-pug', function () {
    return gulp.src(path.src.templates)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: '\t'
            //debug: true
            //locals: jadedata
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.templates))
        .pipe(reload({stream: true}));
});

/* ===========================  Images  =========================== */
gulp.task('dev-transport-images', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dest.img))
});

/* ===========================  Fonts  =========================== */
gulp.task('dev-fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dest.fonts))
});


/* ===========================  Browser-Sync  =========================== */
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            // baseDir: '/var/www/test/priselist/dest/' // Директория для сервера - app
            baseDir: 'dest/'
        },
        // tunnel: true,
        // host: 'localhost',
        // port: 9000,
        // logPrefix: "Frontend_Devil",
        notify: false,
        open: false
    });
});


/*============= clean task =============*/
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/*============= watch task =============*/
gulp.task('watch', function () {
    gulp.watch(path.src.js.script, ['dev-jsScript']);
    gulp.watch(path.src.js.libs, ['dev-jsTransportLibs']);
    gulp.watch(path.src.scss.style, ['dev-sass']);
    gulp.watch(path.src.scss.libs, ['dev-sass-libs']);
    gulp.watch(path.src.templates, ['dev-pug']);
    gulp.watch(path.src.fonts, ['dev-fonts']);
    // gulp.watch(path.src.img, ['dev-transport-images']);
});
/*============= default task =============*/
// gulp.task('default', ['browser-sync', 'watch']);
gulp.task('default', ['browser-sync', 'watch']);