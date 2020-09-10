目录

[TOC]



# 什么是 webpack

> 本质上，webpack 是一个现代 JavaScript 应用程序的b**静态模块打包器(module bundler)**。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

- 语法：commonjs 语法
- 四个核心概念：入口(entry)、输出(output)、loader、插件(plugins)。
- 一个模式：mode


# 入口(entry)
webpack 进入入口，会自动查找相关依赖进行打包。

指定一个入口起点（或多个入口起点），默认值为 ./src。
```js
module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'), // __dirname 当前目录
};
```

多个入口起点：
```js
module.exports = {
  entry: {
    home: resolve(__dirname, "src/index.js"),
    about: resolve(__dirname, "src/main.js")
  }
};
```

# 输出(output)
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

# loader
Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件。 Loader 的作用是让 webpack 拥有了**加载和解析非 JavaScript 文件的能力**。
在 **module.rules** 中配置，也就是作为模块的解析规则而存在，类型为数组。

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




# 插件(plugins)
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


# 模式
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
新建一个 webpack.config.js 文件


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
* babel-loader 转译JS文件
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

# webpack 怎么解决跨域
```js
module.exports = {
    devServer: { // 启动一个本地服务，npm run dev
        port: 3000, // 启动一个端口号
        // 代理设置
        proxy: {
            '/api': {
                target: 'http://localhost:80/index.php', // 目标代理
                pathRewrite: {'^/api' : ''}, // 重写路径
                secure: false, // 是否接受运行在 HTTPS 上
                
            }
        }
    }
}
```

# 常见的 Loaders
## JS loaders
- babel-loader：ES6 转译成 ES5
  
## CSS loaders
- style-loader：将 css 模块（css-loader 处理完的文件）以 style 标签的形式插入到 HTML中
- css-loader：主要用来解析 CSS 中的静态资源，将 @import 和 url() 解析为import/require()
- sass-loader/less-loader：将 sass/less 代码转换为 CSS
- postcss-loader：可以对 CSS 进行各种处理，功能强大，比如自动添加 CSS 前缀，也可自定义插件


解析一个 less 文件，需要多个 loader 串行处理：
```js
module: {
    rules: [
        {//=>预处理语言
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }
    ]
}
```
将 use 配置为一个数组，loader 从右往左依次执行，前一个 loader 的结果是下一个 loader 的输入。
一个 less 文件，首先经过 less-loader 的处理转换为 CSS 文件，接着交给css-loader 去解析 CSS 文件引用的静态变量，最后由 style-loader 以 script 标签的形式加入到 html 中。

## Files Loaders
url-loader 和 file-loader 是一对用来处理图片、svg、视频、字体等静态资源文件的 loader。一般体积比较小的资源交给 url-loader 处理，编码为 base64 字符串，直接嵌入 js 文件中。体积较大的文件由 file-loader 处理，直接释放为一个输出文件。

```js
module: {
    rules: [
        {//=> url-loader (是依赖于 file-loader 的，需要先安装file-loader)
            test: /\.(jpg|png|gif)$/,
            use: 'url-loader',
            options: {
              limit: 8192 // 只在 8192 字节（8K）以下转化 base64。其他情况下在 dist 输出实体图片
            }
        },
        {
            test: /\.(eot|svg|woff|woff2|wtf)$/,
            use: 'url-loader'
        }
    ]
}
```
一般只配置 url-loader 即可，在资源超过 limit 的时候，url-loader 会将资源自动交给 file-loader 处理，并将 options 内容也传递给 file-loader。


# loader 和 plugin 的区别
作用不同：

1）Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。


2）Plugin直译为"插件"。Plugin可以扩展 webpack 的功能，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务。


# 常见面试题

