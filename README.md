目录

[TOC]

面试主要考察三个方面的能力：
- 框架的使用（基本使用，高级特性，周边插件redux、react-router等）
- 框架的原理（基本原理的了解，热门技术的深度，全面性）
- 框架的实际应用，即项目设计能力（组件结构，数据结构）

React 原理考察：
- 考察重点，不是细节，掌握好 2/8 原则（20% 的原理满足 80%的使用基础）
- 和使用相关联的原理。如 vdom、JSX、setState
- 整体流程是否全面（闭环思维），热门技术是否有深度？比如 vdom 和 diff、Hook


# Part01-React 基础
1. MVC 和 MVVM 的区别（重要）
2. React 和 Vue 的区别？共通之处？
3. 怎么理解 React
4. JSX 本质是什么
5. React 是怎么模拟双向数据绑定，原理
6. 函数组件 和 class 组件的区别
7. React 受控组件和非受控组件的区别
8. props 和 state 的区别
9. 组件之间通信方式（重要）
10. Context 是什么，有何用途？
11. 说一下 React 组件的生命周期，都有哪些改变（重要！！！）

# Part02-React 高级
1. 什么是高阶组件？在项目中一般怎么使用？(重要)
2. 谈一谈 HOC、Render props、Hooks（重要）

# Part03-Hook

# Part04-React 原理
1. 说一下 React diff 算法 （重要！！！）
2. 列表渲染为何使用 key？key 为什么不能使用 index 和 random？（重要）


# Part05-Redux

# Part06-React Router

# Part07-性能优化



# React 面试系列目录
1. React 与 Vue 的对比
  - MVVM、MVC
  - 区别
2. JSX 本质
3. 组件：
  - 函数组件 & class 组件的区别
  - 组件之间如何通讯
  - 受控组件、非受控组件
4. Props、State 的区别
  - 不可变值  
5. Context 是什么？如何应用？
6. 生命周期（必须掌握）
    - 单个组件的生命周期
    - 父子组件的生命周期
    - SCU
7. 如何抽离组件公共逻辑？
  - 高阶组件
  - render props
  - 自定义 hook




# React 原理
1. 函数式编程，如不可变值 *
2. vdom 和 diff * 
  - 列表 & key
4. react 事件机制 *
    - 合成事件 *
    - 和 dom 事件的区别  
5. setState 和 batchUpdate（现象级别的必考，原理的可能深挖一下）*
    - 异步，or 同步？
    - 合并更新
6. 组件渲染过程


# React 性能优化
1. 异步组件
  - 使用场景
  - 路由懒加载
2. SCU 与 PureComponent 区别

# Redux
1. 描述 redux 的单项数据流模型 *
2. 异步 action *
3. 中间件 *
4. connect 原理 *
5. 实现一个 redux-thunk、redux-promise




# 手写面试题目录


# 需要再捋捋的知识点
1. React.PureComponent React.memo useMemo
2. redux-saga, dva 与 redux 的区别
3. vdom 和 diff，核心：h 函数、vnode、patch
4. batchUpdate、transaction、fiber


1. React 和 Vue 的区别？共通之处？

// 2. React 组件的生命周期


3. React 闭包陷阱有什么好的解决办法吗？
useReducer 可以解决你知道吗？

// 4. React 受控组件和非受控组件的区别

5. 对 React.memo 的理解
考 React.memo, 三个场景

讲讲 React.memo 和 JS 的 memorize 函数的区别(就是 cache 函数)
