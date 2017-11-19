const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        }]
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