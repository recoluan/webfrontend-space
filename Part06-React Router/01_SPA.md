目录

[TOC]

什么时候用路由？同一个区域展示不同的内容

# SPA & MPA
**SPA：（single page）单页面应用，只有一个页面，所有需要展示的内容都在这一个页面中切换，webpack 中只需要配置一个入口**（移动端居多 或者 PC 端管理系统类也是单页面应用为主）。

MPA：（multi page web application）多页面应用，一个项目由很多页面组成，使用这个产品，主要是页面之间的跳转（PC 端多页面应用居多）：基于框架开发时，需要在 webpack 中配置多入口，每一个入口对应一个页面。

2. 如何实现单页面应用？
1）如果项目是基于服务器渲染的，后台语言中可以基于 include 等技术，把很多部分拼凑在一起，实现组件化或插件化开发，也可以实现单页面应用。
2）基于 iframe 实现单页面应用（父页面可以嵌入子页面，一个 iframe 通过修改的 src 切换不同的子页面）。
3）模块化开发：
AMD：require.js
CMD：sea.js
基于这些思想把每一部分单独写成一个模块，最后基于 grunt/gulp/fis 等自动化工具，最后把所有的模块都合并到首页面中（包括 HTML、CSS、JS 都合并在一起），通过控制哪些模块的显示隐藏来实现单页面应用开发。
弊端：由于首页中的内容包含了 所有模块的信息，所以第一次加载速度很慢。
4）基于 vue、react 的路由实现 SPA 单页面应用，基于 webpack 打包等。

# BrowserRouter & HashRouter
- **BrowserRouter：浏览器路由**
是基于 **H5 的 history API（pushState，replaceState，popState）** 来保持 UI 和URL 的同步，应用的不多。

需要 server 端支持，一般只有当前项目是基于服务器端渲染使用。ToC

- **HashRouter：哈希路由**
一般前后端分离的项目使用哈希路由。**一个 HTML 页面通过不同的 HASH 值呈现不同的组件。** 它基于原生 JS 构造了一套类似于 history API 的机制。每一次路由的切换都是基于 history stack（历史栈）完成的。ToB
  + 当前项目一旦使用 HashRouter，则默认在页面的地址后面加 **'#/'**，也就是 HASH 默认值是一个斜杠，一般让其显示首页内容
  + HashRouter 中`只有一个子元素`
  + 根据哈希地址不同，展示不同的组件内容，此时需要使用 Route 组件


# 常见面试题