const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devServer = require('webpack-dev-server');
const path = require('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname + '/dist'),        
        filename: "app.bundle.js",
    },
    module: {
        rules: [{
            test: /\.scss$/, 
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }],
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules'
        },{
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: '/node_modules'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname + '/dist'),
        compress: true,
        port: 9000,
        stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Project Demo',
          minify: {
              collapseWhitespace: false,
          },
          hash: true,
          template: './src/index.html', // Load a custom template (lodash by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
}