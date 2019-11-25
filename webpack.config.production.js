const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'assets/img/[name].[ext]',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: path.resolve('public', 'index.html'),
      title: 'Banner HTML',
      minify: {
        html5: true,
        collapseWhitespace: true,
        ignoreCustomComments: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
};
