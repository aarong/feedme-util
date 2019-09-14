import gulp from "gulp";
import del from "del";

const clean = () => del("build");

const copySrc = () => gulp.src("./src/*.js").pipe(gulp.dest("build/"));

const copyRoot = () =>
  gulp.src("./{package.json,LICENSE,README.md}").pipe(gulp.dest("build/"));

// Gulp build task
export const build = gulp.series(clean, copyRoot, copySrc); // eslint-disable-line import/prefer-default-export
