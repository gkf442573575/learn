const gulp = require('gulp');
const gulpScss = require('gulp-sass'); // sass
const concat = require('gulp-concat'); // 链接
const uglify = require('gulp-uglify'); // 压缩js
const cleanCSS = require('gulp-clean-css'); // 压缩css
const rename = require('gulp-rename'); // 重命名
const connect = require('gulp-connect'); // 启动服务
const postcss = require('gulp-postcss'); // 进行css转换的
const sourcemaps = require('gulp-sourcemaps'); // sourcemaps
const babel = require('gulp-babel'); // gulp的babel工具
const clean = require('gulp-clean'); //清理文件
const webserver = require('gulp-webserver'); // web服务
const proxy = require('http-proxy-middleware'); // 代理服务
const plumber = require('gulp-plumber'); // 错误情况下不终止进程
const notify = require('gulp-notify'); // 系统错误提醒
const address = require('address');
let localhost = address.ip() || 'localhost'; //获取本地ip
// task定义一个任务
gulp.task('copy-index', () => {
    // gulp.src取到相应的文件
    gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    // gulp.dest 输出路径
});
// 复制页面
gulp.task('copy-html', () => {
    // 也可传数组 ['src/html/*.html','!src/html/a.html'] 传!排除某个文件
    gulp.src(['src/html/**/*.html'])
        .pipe(gulp.dest('dist/html'));
});

// 复制资源
gulp.task('copy-assets', () => {
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});



// 复制vendor的js
gulp.task('copy-vendor-js', () => {
    gulp.src('src/vendor/**/*.js')
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/vendor'));
});
// 复制处理scss
gulp.task('copy-vendor-css', () => {
    gulp.src('src/vendor/**/{*.scss,*.css}')
        .pipe(gulpScss({
            outputStyle: 'expanded' //输出样式 outputStyle  // compressed压缩css expanded 不压缩
        }))
        .pipe(postcss([require('postcss-import'), require('precss'), require('autoprefixer')]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/vendor'))
        .pipe(connect.reload());
});
//处理js
gulp.task('script', () => {
    gulp.src('src/js/**/*.js')
        // .pipe(concat('main.min.js'))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(babel({
            presets: ['env']
        })) //将ES6代码转译为可执行的JS代码
        // .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});


//处理scss
gulp.task('scss', () => {
    //, '!src/css/common.scss'
    gulp.src(['src/css/**/{*.scss,*.css}'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(gulpScss({
            outputStyle: 'expanded' //输出样式 outputStyle  // compressed压缩css expanded 不压缩
        }))
        // .pipe(sourcemaps.init())
        .pipe(postcss([require('postcss-import'), require('precss'), require('autoprefixer')]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// //重新刷新
gulp.task('reload', () => {
    gulp.src('dist/**/*.html')
        .pipe(connect.reload());
});

// 开始
gulp.task('start', ['copy-index', 'copy-html', 'copy-assets',  'copy-vendor-js', 'copy-vendor-css', 'scss', 'script']);


gulp.task('watch', () => {
    // 监听文件变化
    gulp.watch(['src/js/**/*.js'], ['script']);
    gulp.watch(['src/*.html'], ['copy-index']);
    gulp.watch(['src/html/**/*.html', 'src/*.html'], ['copy-html']);
    gulp.watch(['src/assets/**/*'], ['copy-assets']);
    gulp.watch(['src/css/**/{*.scss,*.css}'], ['scss']);
    gulp.watch(['src/vendor/**/*'], ['copy-vendor-js', 'copy-vendor-css']);
    gulp.watch(['dist/**/{*.html,*.js,*.css}', 'dist/assets/**/*'], ['reload']);
});

// gulp的connect的server
gulp.task('server', () => {
    connect.server({
        root: 'dist',
        host: localhost,
        livereload: true,
        port: 8081,
        middleware: function(connect, opt) { // 代理
            return [
                proxy('/api', {
                    target: 'http://192.168.1.78:8080/web/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                })
            ]
        }
    });
});

//清理dist下的文件
gulp.task('clean', () => {
    gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});

//运行default就可以命令行直接gulp就行
gulp.task('default', ['start', 'server', 'watch'], () => {
    console.log(`gulp has run in http://${localhost}:8081`);
});