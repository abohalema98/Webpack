const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/task2.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build/build.js'
    },
    module: {
        rules: [
            {
                // bable_loader ex 1 
                // to load the loader 
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    } // options
                } // use 
            }, // end loader 
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader'],
                use: [
                    // The `injectType`  option can be avoided because it is default behaviour
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    },
                    'css-loader',
                ]
            },
            { // scss loader 
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                        }
                    },
                    // use css 
                    'css-loader',
                    // combile sass 
                    'sass-loader'
                ],

            }, // end scss 
            {
                test: /\.(png|svg|jpg|gif)$/, // image minify 
                use: [
                    {loader:'file-loader'}
                ]
                // use:{loader:'file-loader',options:{name:'[name].[ext]'}}

            },

        ]
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({ // Html plugin  
            template: './src/templet.html',
            filename: 'templetout.html'
        }),
        // new CleanWebpackPlugin() // CleanWebpackPlugin plugin  

    ] // end of plugins 
}


