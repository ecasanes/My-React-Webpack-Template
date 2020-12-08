const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const defaultOutputPath = path.join(__dirname, 'public');

console.log('defaultOutputPath', defaultOutputPath)
console.log('');

module.exports = {
    entry: './index.js',
    plugins: [
        new HtmlWebpackPlugin({
            // reference: https://stackoverflow.com/questions/49227613/div-id-root-div-not-transfering-in-webpack-build/49228840
            title: 'Production',
            template: './src/template.html'
        }),
        // This is handled by the mode property but if you have other
        // environment variables, you can use this one
        // new webpack.EnvironmentPlugin({
        //     'NODE_ENV': 'production'
        // })
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            },
            // {
            //     test: /\.css$/,
            //     // style loader is important to be first
            //     // css loader will be loaded first to process CSS
            //     // then style loader will inject the css to the dom
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                // reference: https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: {
                    loader: "babel-loader"
                }
            },
            {
                //test: /\.s[ac]ss$/i,
                test: /\.scss$/,
                // resolve: {
                //     extensions: [".scss"]
                // },
                use: [ 
                    'style-loader', 
                    'css-loader', 
                    'sass-loader',
                    // {
                    //     loader: 'sass-loader',
                    //     options: {
                    //         implementation: require('node-sass')
                    //     }
                    // }
                ]

            },
        ]
    },
    output: {
        path: defaultOutputPath,
        filename: 'bundle.js'
    },
    // reference: https://ehsangazar.com/source-maps-and-how-it-works-b3f93ca7ea5
    devtool: 'source-map',
    // commenting this out will default dev server in public
    // I think this is based on your output path
    // TODO: Trial and error of the functionality
    // devServer: {
    //     contentBase: path.join(__dirname, 'public')
    // }
}

/**
 * REFERENCES
 * 1 - https://www.youtube.com/watch?v=lFjinlwpcHY&ab_channel=uidotdev
 * 2 - https://www.youtube.com/watch?v=ydDUm1yPZs0&ab_channel=CandDev
 * 3 - 
 */ 

/**
 * Errors encountered: 
 * 1 - Config yargs - cannot find module
 * --- https://github.com/webpack/webpack-dev-server/issues/2759
 * --- This was caused by the version increment of webpack
 * --- use webpack serve instead
 * 
 * 2 - 
 */