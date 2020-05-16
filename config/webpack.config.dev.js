process.env.NODE_ENV = "development";
const webpack = require('webpack');
const merge = require('webpack-merge');
const configBase = require('./webpack.config.base.js');

module.exports = merge(configBase, {
    devtool: 'inline-source-map',
    devServer: {
     contentBase: './dist'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        
        
    ]
});