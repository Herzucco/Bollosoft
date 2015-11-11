/**
 * Created by Adrien on 07/10/2015.
 */
var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');
var express = require('express');
var app = express();

var deepmerge = DeepMerge(function(target, source, key) {
    if(target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

// generic

var defaultConfig = {
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.png$/, loader: "file-loader" },
            { test: /\.glsl$/, loader: 'shader' },
            { test: /\.txt/, loader: 'raw-loader' },
            { test: /\.json/, loader: 'json-loader' },
            { test: /\.yml/, loader: 'yaml-loader' },
            { test: /\.dlgb/, loader: 'dialogbundle-loader'}
        ]
    },
    glsl: {
        // chunks folder, chunkpath by default is ""
        chunkPath: "chunks"
    }
};

defaultConfig.devtool = '#eval-source-map';
defaultConfig.debug = true;

function config(overrides) {
    return deepmerge(defaultConfig, overrides || {});
}

// frontend

var frontendConfig = config({
    entry: './front/src/index.js',
    output: {
        path: path.join(__dirname, 'front/dist'),
        filename: 'app.js'
    }
});

// backend

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var backendConfig = config({
    entry: './src/main.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals: nodeModules,
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ]
});

// tasks

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}

gulp.task('frontbuild', function(done) {
    webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontwatch', function() {
    app.use(express.static('front'));
    app.get('/', function (){});
    app.listen(3000, function(){});
    webpack(frontendConfig).watch(100, onBuild());
});

gulp.task('backend-build', function(done) {
    webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function() {
    webpack(backendConfig).watch(100, function(err, stats) {
        onBuild()(err, stats);
        nodemon.restart();
    });
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('run', ['backend-watch', 'frontend-watch'], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'build/backend'),
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function() {
        console.log('Restarted!');
    });
});
