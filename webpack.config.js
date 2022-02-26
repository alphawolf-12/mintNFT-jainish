const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  module: {
    rules: [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
        loader: "babel-loader",
        options: { presets: ['@babel/env','@babel/preset-react'] },
     }
    },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"]
   },
  output: {
    publicPath : 'auto',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html') })
],
};
