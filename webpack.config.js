const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'client/src'),
  mode: 'development',
  entry: ['babel-polyfill', './index.js'],
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