目录

[TOC]


# 一些概念：渐进式框架、前端工程化

渐进式框架：
一般框架中都包含很多内容，这样导致框架的体积过于臃肿，拖慢加载的速度。真实项目中，我们使用一个框架，不一定用到所有的功能，此时我们应该把框架的功能拆分，用户想用什么自由组合即可。

前端工程化开发的特点：
- 基于组件化、模块化开发
- 基于 webpack 的自动部署


组件化：
- 传统的组件化：只是静态渲染，更新要依赖于操作 DOM
    + asp、jsp、php 的组件化
    + nodejs 类似的组件化
- Vue、React 的组件化：区别于传统组件的本质区别：数据驱动视图

什么是数据驱动视图？
更新不需要手动操作 DOM，只需要修改数据，Vue（MVVM）、React（MVC） 会根据数据重新渲染视图
因此 Vue、React 更加关注于数据，关注于业务逻辑。

# MVVM
![MVVM](https://user-images.githubusercontent.com/22387652/86418026-77c15f80-bd01-11ea-8531-caf2bafb969b.png)

M：Model，数据模型，如 Vue 中的 data
V：View，视图
VM：ViewModel，连接着 Model 和 View，扮演着观察者的角色
特点：`双向的`

- data 更新 view
当数据发生变化时，ViewModel 通过数据绑定、指令等，能够观察到数据的变化，通知到对应的 view 做视图更新；
数据改变触发的是 Object.defineProperty() 对属性设置的 set 函数，将更新 view 的方法放在这个 set 函数中。
- view 更新 data
当用户操作视图，ViewModel 可以通过 DOM 事件监听到变化，然后在事件中修改数据，这就实现了 view 与 model 的双向绑定。


# MVC
M：Model，数据
V：View，视图
C：Controller，控制器
特点：`单向的`

![MVC](https://user-images.githubusercontent.com/22387652/86418327-5ca31f80-bd02-11ea-86eb-a7d545935854.png)






# React 介绍
1. React是一个 MVC 框架。特点：
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

# Vue 和 React
## 共同点
- 都支持组件化
- 都是数据驱动视图
- 都使用 vdom 操作 DOM


## 区别
1. Vue：MVVM（双向数据流）  React：MVC（单向数据流）   

2. Vue 使用 template 迎合 HTML（利于重构）、React 使用 JSX 语法拥抱 JS

3. Vue 声明式编程，对初学者友好；React 函数式编程

4. Vue 底层使用 Object.defineProperty 来实现双向数据绑定
React 不是，但可以 change 事件来模拟实现

5. 钩子函数
React 更新的那套钩子函数做了更精细的控制，可以用 should 来控制是否 update
- Vue 的 beforeMount    React 的 componentWillMount
- Vue 的 mounted    React 的 componentDIdMount
- Vue 的 beforeUpdate    React 的 componentWillUnmount


6. 事件机制：
Vue 的 event 是原生的，事件被挂载到当前元素上，和 原生 DOM 事件一样。
React 的不是原生的，是合成事件对象，事件被挂载到 document 上。

7. 性能优化，对于 React 更加重要（相比于 Vue）！ 
React 的 SCU 默认返回 true



# 面试高频题目
1. React 和 Vue 的区别？共通之处？*

2. 怎么理解 react





