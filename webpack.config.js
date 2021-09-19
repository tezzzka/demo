const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    mode: 'development',
    entry: {
        app: '/src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '',
        // sourceMapFilename: "[name].js.map"
    },
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/env',
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic',
                            },
                        ],
                    ],
                },

            },
            {
                test: /\.(s[ac]ss)$/i,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                ]
            },
            {
                test: /\.(css)$/i,
                use: [
                    "style-loader",
                    "css-loader"

                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                include: path.resolve(__dirname, 'public'),
                loader: 'url-loader'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'React App',
        template: './public/index.html'
    })],
    devServer: {
        port: 3000,
        hot: true,
        //historyApiFallback: true,
    }
}
