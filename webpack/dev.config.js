const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');
const CopyPlugin = require("copy-webpack-plugin");
var d = new Date();

module.exports = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'main.js?v=' + d.getTime(),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/images",
                    to: "images/"
                },
            ],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        historyApiFallback: true,
        port: 4000,
        host: '127.0.0.1'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    node: {
        fs: "empty"
    }
});
