

目录

[TOC]

shouldComponentUpdate 简称 SCU。

# SCU
>**SCU 默认返回 true => 
React 默认：父组件有更新，子组件则无条件更新！！！** 

无条件的意思是：父组件只要重新 render，子组件都会执行，不管子组件的 props 是否变化。

那么，我们如何去拦截非必要子组件的更新，来优化性能呢？？？

React 给出了可以定制返回 false 的 SCU，例如，当 count 值发生改变的时，我们才去 render，可以这样用：
```javascript
shouldComponentUpdate(nextProps, nextState){
  if (nextProps.count !== this.props.count){
    return true; // 可以渲染
  }
  
  return false;
}
```
默认返回 true，返回 false 则不执行执行后面的钩子函数，“阻止”重新渲染。



## SCU 必须配合不可变值使用 
[online-demo](https://codesandbox.io/s/react-base-6tspi?file=/src/SCUDemo/index.js)

```js
// 父组件中，list 是一个 id、title 的数组对象
onChangeList = title => {
  // 1. 违反 不可变值情况下，使用 SCU
  // push 直接修改的 this.state.list，
  // 导致 List 组件中，nextProps.list 和 this.props.list 完全相等，因此 SCU 返回 false 拦截了渲染
  this.state.list.push({
    id: `id-${Date.now()}`,
    title
  });
  this.setState({
    list: this.state.list
  });
};
```
```js
// List 组件中
import _ from "lodash";

shouldComponentUpdate(nextProps) {
  // _.isEqual 深度比较 对象、数组
  // _.isEqual({ a: 1 }, { a: 1 }) => true
  // _.isEqual({ a: 1 }, { a: 1, b: 2 }) => false
  if (!_.isEqual(nextProps.list, this.props.list)) {
    // 不相等，则渲染
    return true;
  }

  return false;
}
```

```js
// 父组件中，list 是一个 id、title 的数组对象
onChangeList = title => {
  // 2. SCU 配合不可变值，每次都返回一个 新的 list
  this.setState({
    list: this.state.list.concat({
      id: `id-${Date.now()}`,
      title,
    }),
  });
};
```
**isEqual 深度比较 需要一次性递归到底**，也是非常消耗性能的，所以一般并不建议 这样 在 SCU 中使用深度比较（慎用）。
 
那么，React 有提供做 **浅比较（只比较第一层属性）** 的方案吗 ？？？
- React.PureComponent，class 组件中。
=> 相比于 React.Component，在 SCU 中实现了对 props 和 state 的浅比较
=> 也需要配合不可变值来使用
- React.memo，在函数组件中，实现了对 props 的浅比较。





# immutable.js

使用不可变值，最简单的办法是：每一次都深拷贝一份，每一次操作的结果肯定是一个新的数组或对象。这样将导致性能极差。

> **immutable.js 彻底拥抱不可变值，基于共享数据实现（不是深拷贝）。**

```js
const map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1.get('b') // 2
map2.get('b') // 50
```




# 面试高频题目
1. shouldComponentUpdate（SCU） 的用途 *
2. SCU PureComponent memo immutable
