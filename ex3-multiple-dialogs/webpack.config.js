var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

 module.exports = {
     entry: ['babel-polyfill', './main.js'],
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/svgxuse/svgxuse.js' },
            { from: 'node_modules/wicg-inert/dist/inert.js' },
        ], {copyUnmodified: true})
    ],
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };