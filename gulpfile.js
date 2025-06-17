const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");

gulp.task("scss", function () {
  return gulp
    .src("src/css/scss/!(_)*.scss") // build tất cả file không có dấu _
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("html", function () {
  return gulp
    .src(["src/views/*.html"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src/views",
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
  gulp.watch("src/css/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("src/views/**/*.html", gulp.series("html"));
});

gulp.task("default", gulp.parallel("html", "scss", "watch"));