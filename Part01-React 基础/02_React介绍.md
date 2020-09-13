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
MVVM 特点：`双向的`：
- M：Model，数据模型，如 Vue 中的 data
- V：View，视图
- VM：ViewModel，连接着 Model 和 View，扮演着**观察者**的角色

![MVVM](https://user-images.githubusercontent.com/22387652/86418026-77c15f80-bd01-11ea-8531-caf2bafb969b.png)

View 与 model 的双向绑定:
1. Model 更新 view

当数据发生变化时，ViewModel 通过**数据绑定、指令**等，能够观察到数据的变化，通知到对应的 View 做视图更新；
数据改变触发的是 Object.defineProperty() 对属性设置的 set 函数，将更新 View 的方法放在这个 set 函数中。

2. View 更新 Model

当用户操作视图，ViewModel 可以通过 **DOM 事件监听**到变化，然后在事件中修改数据。


# MVC
MVC 特点：`单向的`：
- M：Model，数据
- V：View，视图
- C：Controller，**控制器**。


![MVC](https://user-images.githubusercontent.com/22387652/86418327-5ca31f80-bd02-11ea-86eb-a7d545935854.png)

![MVC](https://user-images.githubusercontent.com/22387652/92855979-7ad57c00-f425-11ea-9d94-5b97736e33e0.png)

Model 和 View 之间不能直接通信。Controller 是 Model 和 View 之间通信的桥梁，通常 Controller 负责从 View 读取数据，控制用户输入，并向 Model 发送数据。

1. View 和 Controller 的交互
View 接收用户输入的数据，然后由 Controller 把这些数据发送给 Model 来保存到本地或者上传到服务器。

2. Model 和 Controller 的交互
Controller 负责把 Model 最新的数据赋值给 View。所以 Controller 应该关注的事件是：Model 的值是否发生了变化。






# React 介绍
1. React 并非是一个 MVC 框架，或者说它的优势不在于 MVC 三层的分离。特点：
- 划分组件开发
- 基于路由的 SPA 单页面开发
- 通过虚拟 vdom 技术简化了的 UI 开发逻辑，弱化了 MVC 中的 C 层
- 侧重于 View 层，优势是组件化


2. React全家桶：react / react-dom / react-router / redux / react-redux / axios / ant / dva / saga / mobx

3. React 有两部分组成：
- react：框架的核心部分，提供了 Component 类进行组件开发，提供了钩子函数（生命周期）
- react-dom：把 JSX 语法渲染为真实 DOM 的组件


4. 虚拟 DOM（vdom）
1）何为 vdom？基于 React.createElement(type, props, children) 把 JSX 转换为一个轻量级的 JS 对象，这个对象就是虚拟 DOM。
2）vdom 优势：每当数据变化时，React 都会重新构建 vdom 树，再将当前vdom 树与上一次的 vdom 树进行对比计算（Diff 算法），找出最小的更新范围。然后“仅仅将变化的部分进行实际的浏览器 DOM 更新”。虽然每次都要建立 vdom 树，但 vdom 是内存数据（在 JS 引擎中执行），所以速度很快。

5. 组件化
UI 各个部分被封装成小组件，小组件再组合成大组件，整个 web 页面由小组件组合嵌套得到。



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



# 常见面试题
## 说一下什么是 MVC，MVC 和 MVVM 的区别？
## React 和 Vue 的区别？共通之处？

## 怎么理解 React





