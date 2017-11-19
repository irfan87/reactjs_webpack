const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devServer = require('webpack-dev-server');
const path = require('path');
const webpack = require('webpack');

// it will return if webpack run on development
let isProd = process.env.NODE_ENV === 'production'; 
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader", "sass-loader"], publicPath: '/dist'});

// check if the production is true
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: "./src/index.js",
        contact: "./src/contact.js"
    },
    output: {
        path: path.resolve(__dirname + '/dist'),        
        filename: "[name].bundle.js",
    },
    module: {
        rules: [{
            test: /\.scss$/,
            // use: ["style-loader", "css-loader", "sass-loader"] 
            use: cssConfig
        }, {
            test: [/\.js$/, /\.jsx$/],
            use: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.pug$/,
            use: 'pug-loader'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname + '/dist'),
        compress: true,
        hot: true,
        port: 9000,
        // stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Project Demo',
          minify: {
              collapseWhitespace: false,
          },
          hash: true, 
          excludeChunks: ['contact'],
          template: './src/index.pug', 
        }),
        new HtmlWebpackPlugin({
          title: 'Contact Page',
          hash: true, 
          chunks: ['contact'],
          filename: 'contact.html',
          template: './src/contact.html', 
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}