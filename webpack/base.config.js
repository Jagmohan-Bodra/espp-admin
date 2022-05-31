const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Management System',
      // favicon: 'favicon.ico',
      template: "./public/index.html",
      filename: "./index.html"
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve('src'),
      bem: path.resolve('src/helpers/bem'),
      _yup: path.resolve('src/helpers/yup'),
    },
  },
};
