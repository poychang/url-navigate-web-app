const path = require('path');
const webpack = require('webpack');
const copy = require('copy-webpack-plugin');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,
    entry: {
        app: './app.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ROOT, 'node_modules']
    },
    module: {
        rules: [
            // PRE-LOADERS
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },
            // LOADERS
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new copy([{ from: `${ROOT}/index.html`, to: `${DESTINATION}/index.html` }]),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {}
};
