var path = require('path');
var webpack = require('webpack');
var minimize = process.argv.indexOf('--minimize') > -1;
var minFile = minimize ? '.min' : '';
var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

minimize && plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      //'webpack-dev-server/client?http://localhost:8080',
      //'webpack/hot/only-dev-server',
      './src/main.js'
    ]
  },
  output: {
    filename: '[name]' + minFile + '.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
            presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loader: 'style!css!sass'
      }
    ]
  }
}
