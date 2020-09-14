目录

[TOC]

## React.PureComponent

## React.memo
React.memo 为高阶组件，与 React.PureComponent 非常相似：
- 只适用于函数组件，而不适用 class 组件
- 仅检查 props 变更（浅层对比）
```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

默认情况下其只会对复杂对象做浅层对比，如果想要控制对比过程：
=> 第二个可选参数：可以传入一个自定义的比较函数
```js
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  通过比较 prevProps 与 nextProps 是否一致则返回 true，还是 false
  这与 shouldComponentUpdate 方法的返回值相反。
  */
}
export default React.memo(MyComponent, areEqual);
```


- [使用 React.memo 和 useMemo 对 Function Component 进行性能优化](http://www.ptbird.cn/react-hook-useMemo-purerender.html)


# 常见面试题
## PureComponent、memo、immutable（重要）
   => 为什么要引入 immutable.js？
   
## 对 React.memo 的理解
考 React.memo, 三个场景

讲讲 React.memo 和 JS 的 memorize 函数的区别(memorize函数当时不知道，以为是什么高深的算法，后来才发现就是cache函数)