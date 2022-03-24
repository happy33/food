const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{    
        path:path.join(__dirname, '/build'),  
        filename:"bundle.js",
        clean:true
    },
    devServer:{
        compress:true,
        port:3000,
        historyApiFallback:{
            disableDotRule: true
        }
    },
    module:{
        rules:[
            {        
                test:/\.js?$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                    
                }
            },
            {
                test: /\.css$/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ],
                exclude:/node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]',
                            esModule:false
                        }
                    }
                ],
                type:'javascript/auto'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            option:{
                publicPath:"./",
            }
        })
    ]
}