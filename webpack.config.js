const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var fileLoaderOption = {
    loader: 'file-loader',
    options: {
        name: './[name].[ext]',
    }
};


module.exports = {
    entry: {
        index: './src/index.js',
        header: './src/header.js',
        top: './src/top.js',
        product: './src/product.js',
        address_add: './src/address_add.js',
        address: './src/address.js',
        auction: './src/auction.js',
        logistics: './src/logistics.js',
        refund: './src/refund.js',
        regrefund: './src/regrefund.js',
        sms: './src/sms.js',
        sms_send: './src/sms_send.js',
        content: './src/content.js',
        member_share: './src/member_share.js',
        myshare: './src/myshare.js',
        mycoupon: './src/mycoupon.js',
        creditmanagement: './src/creditmanagement.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use:  ['style-loader', 'css-loader', 'less-loader']
            }
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // loader:[fileLoaderOption]
                }
            },
            { test: /iview.src.*?js$/, loader: 'babel-loader' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [fileLoaderOption]
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