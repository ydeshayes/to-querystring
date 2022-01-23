var webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
var path = require('path');
var env = require('yargs').argv.env;

let libraryName = 'to-querystring';
let plugins = [new ESLintPlugin()], outputFile;
let optimization = {
  minimize: true,
  minimizer: [new TerserPlugin()],
}; 

if (process.env.NODE_ENV === 'production') {
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.js)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /(\.js)$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src')
    ],
    extensions: ['.js', '.ts']
  },
  optimization,
  plugins: plugins
};

module.exports = config;
