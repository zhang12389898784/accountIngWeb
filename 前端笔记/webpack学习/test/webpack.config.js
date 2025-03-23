const eslint=require("eslint-webpack-plugin")
const minicss=require("mini-css-extract-plugin")
const minimizer=require("css-minimizer-webpack-plugin")
const htmlwebpackplugin=require("html-webpack-plugin")
module.exports = {
    mode: 'development',
    entry: {
        app: __dirname + '/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[hash:4].bundel.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                            ]
                        ]
                    }
                }
            },
            {
                test:/\.css/,
                use:[minicss.loader,'css-loader']
            },
        ]
    },
    plugins: [
        // new eslint({
        //     extensions: ['.js'],
        //     fix: true
        // })
        new minicss({
            filename:'[name].[hash:4].css'
        }),
        new minimizer(),
        new htmlwebpackplugin({
            template:__dirname+'/index.html',
            filename:'index.html',
            minify:{
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        }),
        new htmlwebpackplugin({
            template:__dirname+'/index.html',
            filename:'index23.html'
        })
    ]
}