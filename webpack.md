目录

[TOC]



# 什么是 webpack

> 本质上，webpack 是一个现代 JavaScript 应用程序的b**静态模块打包器(module bundler)**。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

- 语法：commonjs 语法
- 四个核心概念：入口(entry)、输出(output)、loader、插件(plugins)。
- 一个模式：mode

## 入口(entry)
指定一个入口起点（或多个入口起点），默认值为 ./src。webpack 进入入口，会自动查找相关依赖进行打包。
```js
module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'), // __dirname 当前目录
};
```

## 输出(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
```js
const path = require('path'); // Node.js 核心模块，用于操作文件路径。

module.exports = {
  output: {
      filename: 'bundle.js', //=>webpack bundle 的名称，打包后的文件名
      path: path.join(__dirname, 'dist') //=>必须是一个绝对路径
  },
};
```

## loader
loader 定义在 **module.rules** 中，让 webpack 能够去处理那些**非 JavaScript 文件**（webpack 自身只理解 JavaScript）。

在 webpack 的配置中 loader 有两个目标：
- **test 属性**，标识出要转换的某个或某些文件
- **use 属性**：使用哪个 loader 进行转换
- **include 属性**：包含哪些目录
- **exclude 属性**：排除哪些目录

```js
module.exports = {
  module: { // 模块的解析规则
    rules: [
      { test: /\.txt$/, use: 'raw-loader' } // webpack 编译器 遇到 .txt 的文件，打包之前，先使用 raw-loader 转换一下
    ]
  }
};
```



## 插件(plugins)
想要使用一个插件，只需要 require() 它，然后把它添加到 plugins 数组中。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'), // 已有的、作为模板的 html 文件
        filename: 'index.html' // 产出的文件名字
    }),

  ]
};
```


## 模式
mode 可选 development 或 production，默认为后者.
- development 代码未压缩，便于调试
- production 默认压缩代码并进行其他优化（如 tree shaking）
```js
module.exports = {
  mode: 'production'
};
```

# 初始化一个 webpack
"build": "webpack --config webpack.config.js",


```shell
npm init -y // 初始化环境，生成一个 packgon.json 文件 
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

# webpack-dev-server：启动一个服务
1. `$ npm install webpack-dev-server --save--dev`
2. 添加 devServer
```js
module.exports = {
    devServer: { // 启动一个本地服务，npm run dev
        port: 3000, // 启动一个端口号
        contentBase: path.join(__dirname, 'dist'),  // 根目录
        open: true,  // 自动打开浏览器
    }
}
```
2. package.json 里需要配置：
```json
"scripts": {
  "dev": "webpack-dev-server"
},
```
3. 运行 `$ npm run dev`
   

# 配置 babel：支持编译 ES6 为 ES5
`$ npm install @babel/core @babel/preset-env babel-loader --save--dev`

新建 .babelrc 文件（JSON 格式）：
```json
{
  "presets": ["@babel/preset-env"]
}
```
加一个 loader：
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include:  path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
        ]
    }
}
```
默认支持 ES6 模块化语法：export/import

```js
/*
* babel-loader转译JS文件
* 1.ES6
* babel-preset-es2015只是让babel-loader拥有解析es6语法的功能，拥有能力之后要去.babelrc通知（预设置）
* 2.ES7
* babel-preset-stage-0（stage包含01234几个阶段，4代表ES6，0包含123阶段，拥有的功能最多）
*
* */
```

# 配置生产环境的打包
1. 新建 webpack.prod.js 文件，修改：
- mode: 'production'
- 删掉 devServer
- output.filename: 'bundle.[contenthash].js' // 根据代码不同，生成不同的文件名
  
2. package.json 里需要配置：
```json
"scripts": {
  "build": "webpack --config webpack.prod.js"
},
```

# 常见面试题
