var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var minimize = process.argv.indexOf('--minimize') > -1;
var minFile = minimize ? '.min' : '';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('main.css', {
        allChunks: true
    })
];
var postCssPlugins = [autoprefixer];
var sourceMap = 'source-map';

if(minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    postCssPlugins.unshift(cssnano);
    
    //don't generate source map when generating minified files
    sourceMap = '';
}

module.exports = {
  devtool: sourceMap,
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
    publicPath: ''
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
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      },
      { 
          test: /\.(png|jpg)$/, 
          include: path.join(__dirname, 'src'),
          loader: 'file-loader?name=./images/[name].[ext]' }
    ]
  },
  postcss: function () {
      return postCssPlugins;
  }
}
