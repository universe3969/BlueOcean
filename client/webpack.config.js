const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      // Babel for JSX syntax
      {
        test: /\.(js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      // Node-SASS loader for SASS
      {
        test: /\.s[ca]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // Image importer
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Boilerplate',
      template: path.join(__dirname, './src/template.html'),
    }),
    new Dotenv()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './public'),
    },
    port: 8080,
    compress: true,
  },
  devtool: 'inline-source-map',
};
