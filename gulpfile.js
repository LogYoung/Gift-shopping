var gulp = require("gulp"),
    minicss=require("gulp-clean-css"),
    minijs=require("gulp-uglify"),
    sass=require("gulp-sass"),
    livereload = require('gulp-livereload');
    
gulp.task("_minicss",function(){
	 gulp.src("css/*.css")
		.pipe(minicss())
		.pipe(gulp.dest("dist/css/"));
})

gulp.task("_minijs",function(){
	 gulp.src("js/*.js")
	     .pipe(minijs())
	     .pipe(gulp.dest("dist/js/"));
})


gulp.task("_sass", function(){
	gulp.src("sass/*.scss")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("dist/css/"))
		.pipe(livereload());
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('sass/*.scss', ['_sass']);
});


gulp.task("allmini",["_minicss","_minijs"]);
