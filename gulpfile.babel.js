import gulp from "gulp";
import del from "del";
import babel from "gulp-babel";

const clean = () => del("build");

const bld = () =>
  gulp
    .src(["src/**/*.js", "!src/**/__tests__/*"]) // All js files not in __tests__
    .pipe(babel())
    .pipe(gulp.dest("build/"));

const copy = () =>
  gulp.src("./{package.json,LICENSE,README.md}").pipe(gulp.dest("build/"));

// Gulp build task
export const build = gulp.series(clean, bld, copy); // eslint-disable-line import/prefer-default-export
