const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  mode: 'development',
};
