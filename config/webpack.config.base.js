const path = require('path');
const glob = require("glob");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 输出友好报错信息  还需要关闭 webpack-hot-middleware 打印日志配置 webpack.server.js 配置
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 输出css到单独的文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "static/css/[name].css",
    disable: process.env.NODE_ENV === "development"
});
    
const Autoprefixer = require("autoprefixer"); // 自动加兼容前缀

const px2rem = require("postcss-plugin-px2rem"); // px 转 rem 值


    // 获取pages下的所有入口
    function getEntry() {
        var entry = {};
        //读取src目录所有page入口
        glob.sync('./src/pages/**/index.{ts,tsx,js,jsx}')
            .forEach(function (name) {
                // 获取格式字符串
                var format = name.match(/\.(ts|tsx|js|jsx)$/);
                var formatLength = format[0].length;
                var start = name.indexOf('src/') + 4,
                    end = name.length - formatLength;
                var eArr = [];
                var n = name.slice(start, end);
                n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
                n = n.split('/')[1];
                eArr.push(name);
                // 开发环境增加热重载功能
                if(process.env.NODE_ENV === "development"){
                    eArr.push("webpack-hot-middleware/client");
                }
                entry[n] = eArr;
            });
        return entry;
    };

    // console.log(getEntry());


    // 获取html-webpack-plugin参数的方法
    var getHtmlConfig = function (name, chunks) {
        console.log(name,chunks);
        return {
            template: `./index.html`,
            filename: `${name}.html`,
            // favicon: './favicon.ico',
            // title: title,
            inject: true,
            hash: true, //开启hash  ?[hash]
            // chunks: chunks,
            minify: process.env.NODE_ENV === "development" ? false : {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //折叠空白区域 也就是压缩代码
                removeAttributeQuotes: true, //去除属性引用
            },
        };
    };

// console.log(getEntry());
    module.exports = {
        entry: getEntry(),
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ,'.json']
        },
        output: {
            filename: 'static/js/[name].js',
            //   chunkFilename: '[name]/static/js/[name].chunk.js',
            path: path.resolve(__dirname, '../dist'),
            // publicPath:'/Shein/oa_project/'
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: '../dist'
        },
        mode:process.env.NODE_ENV = 'development' ? 'development' : 'prodcument',
        module: {
            rules: [
                {
                    test:/\.(png|svg|jsp|gif)/,
                    include: path.resolve(__dirname, '../src'),
                    use:[
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|svg|eot|ttf)\??.*$/,
                    loader: "url-loader?name=fonts/[name].[md5:hash:hex:6].[ext]"
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, '../src'),
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ],
                },
                {
                    test: /\.less$/,
                    // include: path.resolve(__dirname, '../src'),
                    use: extractLess.extract({
                        use: [
                        // {
                        //     loader:'cache-loader'
                        // },
                        // {
                        //     loader:'style-loader'
                        // },
                        {
                            loader: "css-loader"
                        }, {
                            loader: "postcss-loader",
                            options:{
                                plugins:[
                                    Autoprefixer(),
                                    px2rem({
                                        rootValue:37.5
                                    })
                                ]
                            }
                        },{
                            loader: "less-loader",
                            options:{
                                lessOptions:{
                                    javascriptEnabled: true
                                } 
                            }
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })              
                },
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, '../src'),
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],               
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            // new TsconfigPathsPlugin(),
            extractLess,
            new webpack.NoEmitOnErrorsPlugin(),
            new FriendlyErrorsWebpackPlugin()
        ],
        // stats:"errors-only"
    };


    // 配置页面
    const entryObj = getEntry();
    const htmlArray = [];
    Object.keys(entryObj).forEach(element => {
        htmlArray.push({
            _html: element,
            title: '',
            // chunks: ['vendor', element]
        })
    })

    //自动生成html模板
    htmlArray.forEach((element) => {
        module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
    })

