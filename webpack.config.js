const path = require('path');  //路径
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除已经打包的
const webpack = require('webpack');  

var fileLoaderOption = {
    loader: 'file-loader',
    options: {
        name: '[name].[ext]',
        publicPath:'dist/'
    }
};
//文件加载配置

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
        creditmanagement: './src/creditmanagement.js',
        evaluation:'./src/evaluation.js',
        evaluation_list:'./src/evaluation_list.js',
        cart_buy:'./src/cart_buy.js',
        findpass:'./src/findpass.js'
    },  //入口
    devServer: {
        contentBase: './dist',
        hot: true
    },//服务器，其实这个应该可以不用
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { root: './dist/' }
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
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
    },//处理规则
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],//清除哪个目录
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/dist'),
        library: 'bundle',
        libraryTarget: 'var',
    },//输出
    externals: {
        Vue: {
            commonjs: 'Vue',
            commonjs2: 'Vue',
            amd: 'Vue',
            root: '_'
        }
    }

};