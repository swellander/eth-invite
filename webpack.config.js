const path = require('path');

module.exports = {
  // watch: true,
  // watchOptions: {
  //   ignored: ['node_modules', './server', './ethereum']
  // },
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