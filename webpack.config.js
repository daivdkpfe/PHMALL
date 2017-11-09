const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry:{
    index:'./src/index.js',
    header:'./src/header.js',
    top:'./src/top.js',
    product:'./src/product.js'
  },
  devServer: {
         contentBase: './dist',
         hot: true
       },
       module: {
             rules: [
               {
                 test: /\.css$/,
                 use: ['style-loader', 'css-loader']
               },
                {
                  test: /\.vue$/,
                  loader: 'vue-loader'
                }
              
             ]
           },
           resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js'
            }
          },
  plugins: [
        new CleanWebpackPlugin(['dist']),
       ],
       output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/dist'),
        library: 'bundle',
             libraryTarget: 'var',
        
           },
           externals: {
             Vue: {
               commonjs: 'Vue',
               commonjs2: 'Vue',
               amd: 'Vue',
               root: '_'
             }
           }
  
};