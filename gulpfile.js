"use strict";

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src("*/**.ts !src/_all.d.ts !*/**.d.ts !src/.baseDir.ts")
        .pipe(tsProject())
        .js.pipe(gulp.dest("."));
});