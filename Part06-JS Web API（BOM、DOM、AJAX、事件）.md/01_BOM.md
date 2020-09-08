目录

[TOC]


重学JS系列 - 01_BOM.md



BOM: Browser Object Model

# window 对象

# location 对象
location：url信息、主要用于分析拆解 URL 的各个部分

- location.href：整个网址 
- location.protocol：协议
- location.host：域名 
- location.pathname：路径 
- location.search：query 参数
- location.hash：hash 值

比如 URL：'http://www.baidu.cn/stu/?lx=1&name=AA&sex=man#teacher'
```js
// hash: "#teacher"
// host: "www.baidu.cn"
// hostname: "www.baidu.cn"
// href: "http://www.baidu.cn/stu/?lx=1&name=AA&sex=man#teacher"
// origin: "http://www.baidu.cn"
// pathname: "/stu/"
// port: ""
// protocol: "http:"
// search: "?lx=1&name=AA&sex=man"
```

# navigator 对象
navigator：浏览器信息

如何识别浏览器类型？ navigator.userAgent、在移动端比较常见，识别微信、QQ浏览器等
```js
const ua = navigator.userAgent;
const isChrome = ua.indexOf('Chrome)
console.log(isChrome)
```

# screen 对象
screen：屏幕信息
- screen.width
- screen.height

# history 对象
history：历史记录
- history.back()
- history.forward()

# 常见面试题
## 如何捕获 JS 中的异常？
```js
// 1. 手动捕获
try {
    // todo
} catch (err) {
    console.error(err)
} finally {
    // todo
}
// 2. 自动捕获
window.onerror = function (message, source, lineNum, colNum, error) {
    // 第一，对跨域的 js，如 CDN 的，不会有详细的报错信息
    // 第二，对于压缩的 js，还要配合 sourceMap 反查到未压缩代码的行、列 
}
```

## 什么是 JSON？常用的 API？
JSON 是一种数据格式，本质是一段 **字符串**。

JSON 中的对象和 JS 的对象结构几乎一致：
- 对象的属性必须使用双引号
- 末尾没有分号
  
window.JSON 是一个全局对象，常用的 API 有：
- JSON.stringify()：把 JS 对象序列化为 JSON 字符串
- JSON.parse()：把 JSON 字符串解析为 JS 值




