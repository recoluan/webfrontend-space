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

# React 面试系列目录

1. React 和 Vue 的区别？共通之处？

// 2. React 组件的生命周期


3. React 闭包陷阱有什么好的解决办法吗？
useReducer 可以解决你知道吗？

// 4. React 受控组件和非受控组件的区别

5. 对 React.memo 的理解
考 React.memo, 三个场景

讲讲 React.memo 和 JS 的 memorize 函数的区别(就是 cache 函数)

# React 面试的重点
1. react 事件机制 *
    - 和 dom 事件的区别
2. state 和 setState *
    - 不可变值
    - 异步，or 同步？
    - 合并更新
3. 生命周期（必须掌握）
    - SCU

# Redux 面试的重点

1. 描述 redux 的单项数据流模型 *
2. 异步 action *
3. 中间件 *
4. connect 原理 *
5. 实现一个 redux-thunk、redux-promise

# React 原理
1. 函数式编程，如不可变值 *
2. vdom 和 diff * 
3. JSX 本质 *
4. 合成事件 *
5. setState 和 batchUpdate（必考）*
6. 组件渲染过程

# 需要再捋捋的知识点
1. React.PureComponent React.memo useMemo
2. redux-saga, dva 与 redux 的区别
3. vdom 和 diff，核心：h 函数、vnode、patch