const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'), // __dirname 当前目录 
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include:  path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'), // 已有的、作为模板的 html 文件
            filename: 'index.html' // 产出的文件名字
        })
    ],
    devServer: { // 启动一个本地服务，npm run dev
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),  // 根目录
        open: true,  // 自动打开浏览器
    }
}