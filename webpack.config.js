const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devServer = require('webpack-dev-server');
const path = require('path');

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
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: [/\.js$/, /\.jsx$/],
            use: 'babel-loader',
            exclude: '/node_modules/'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname + '/dist'),
        compress: true,
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
        new HtmlWebpackPlugin({
          title: 'Contact Page',
          hash: true, 
          chunks: ['contact'],
          filename: 'contact.html',
          template: './src/contact.html', 
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
}