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
            use: cssConfig
        }, {
            test: [/\.js$/, /\.jsx$/],
            use: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.pug$/,
            use: 'pug-loader'
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                // 'file-loader?name=[name].[ext]&outputPath=images/', 
                'file-loader?name=images/[name].[ext]',
                'image-webpack-loader'
            ]
            // use: 'file-loader?name=[hash:12].[ext]&outputPath=images/'
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
          template: './src/index.html', 
        }),
        // if we want to have a multiple pages
        // new HtmlWebpackPlugin({
        //   title: 'Contact Page',
        //   hash: true, 
        //   chunks: ['contact'],
        //   filename: 'contact.html',
        //   template: './src/contact.html', 
        // }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}