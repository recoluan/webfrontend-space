目录

[TOC]


# 一些概念：渐进式框架、前端工程化

渐进式框架：
一般框架中都包含很多内容，这样导致框架的体积过于臃肿，拖慢加载的速度。真实项目中，我们使用一个框架，不一定用到所有的功能，此时我们应该把框架的功能拆分，用户想用什么自由组合即可。

前端工程化开发的特点：
- 基于组件化、模块化开发
- 基于webpack的自动部署


# MVC

# MVVM

# React介绍
1. React是一个MVC框架。特点：
- 划分组件开发
- 基于路由的SPA单页面开发
- 基于ES6写代码（最后部署上线时，需要把ES6编译成ES5，基于Babel来完成编译）
- 可能用到less/sass等，也需要使用对应的插件进行预编译
- 最后为了优化性能（减少HTTP请求次数），需要把JS或者CSS进行合并压缩
webpack完成以上页面组件合并、JS/CSS编译加合并等工作。



2. React全家桶：react / react-dom / react-router / redux / react-redux / axios / ant / dva / saga / mobx

3. react有两部分组成：
- react：框架的核心部分，提供了Component类进行组件开发，提供了钩子函数（生命周期）
所有的生命周期函数都是基于回调函数完成的。
- react-dom：把JSX语法（react独有的语法）渲染为真实DOM的组件（能够放到页面中展示的结构都叫做真实的DOM）

4. 怎么理解react
react并非是一个mvc框架，或者说他的优势不在于mvc三层的分离（反而有时候mvc是被集成在一个jsx文件里的）。它侧重于view层，优势是组件化，UI功能模块之间的松耦合。vdom使得c层逻辑简单，而数据层的管理还要依赖于redux等。
1、虚拟DOM
（1）何为虚拟dom？是基于真实dom树建立的一个轻量级的JavaScript对象，render执行的结果得到的不是真实的dom，而是虚拟dom。
（2）vdom优势：每当数据变化时，react都会重新构建vdom树，再将当前vdom树与上一次的vdom树进行对比（Diff算法），得到区别，然后“仅仅将需要变化的部分进行实际的浏览器DOM更新”。虽然每次都要建立vdom树，但vdom是内存数据（在JavaScript引擎中执行），所以速度很快。
我理解，很多框架都能实现"只更新需要变化的dom"，但vdom这种实现方式，使得我们可以每次在数据变化时都去刷新整个页面，而不用关心具体要变化的是哪个dom，只需要关注于数据整体，所以vdom带来了简单的UI开发逻辑。

2、组件化
UI各个部分被封装成小组件，小组件再组合成大组件，整个web页面由小组件组合嵌套得到。

总结：react通过虚拟dom技术简化了的ui开发逻辑，弱化了mvc中的c层，实现ui层的组件化，提高代码的复用性和可维护性，提升开发效率。


# 面试高频题目
1. React 和 Vue 的区别？共通之处？
- MVC（单向数据流）    MVVM（双向数据流）
- vue底层使用Object.defineProperty来实现双向数据绑定
react不是，但可以change事件来模拟实现
- template（迎合HTML，利于项目重构）
react使用JSX语法
- 钩子函数
vue的beforeMount对应react的componentWillMount
vue的mounted对应react的componentDIdMount
react更新的那套钩子函数做了更精细的控制，可以用should来控制是否update

2. 怎么理解react





