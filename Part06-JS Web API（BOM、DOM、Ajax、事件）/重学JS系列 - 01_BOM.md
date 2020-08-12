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




