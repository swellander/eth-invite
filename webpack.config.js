const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './client/src'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}