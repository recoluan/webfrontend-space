目录

[TOC]

# 组件
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


# Fragments
## React.Fragment
Fragment 允许包裹一个子元素列表，而**无需向 DOM 添加额外节点**。

比如，在一个 table 中，需要单独处理两个 td，如果我们用 一个 div 包裹，则生成的 HTML 将无效。这时候就可以用到 Fragment。
```js
<table>
  <tr>
    {
      // 渲染条件 &&
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    } 
  </tr>
</table>
```
在列表循环中，支持 key 属性。
简短的语法: <> </>

# React.createRef
当 创建的 ref 用于 HTML 元素时，current 属性拿到的是 DOM 元素

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();// 创建 ref
  }

  componentDidMount() {
    const elem = this.nameInputRef.current;// 通过 ref 的 current 属性来获取 DOM 元素
    // elem.value 可以获取 input 的值
    
    elem.focus(); 
  }

  render() {
    // 将 创建的 ref 与 HTML 元素 关联
    return <input type="text" ref={this.inputRef} />;
  }
}
```
Hook 版本的：
```js
import { useState, useEffect } from 'react'; 

const MyComponent = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const elem = inputRef.current;
    elem.focus(); 
  }, []);

  render() {
    return <input type="text" ref={inputRef} />;
  }
}
```

# 面试高频题目
1. 对 React.memo 的理解 *
考 React.memo, 三个场景

讲讲React.memo 和 JS 的 memorize 函数的区别(memorize函数当时不知道，以为是什么高深的算法，后来才发现就是cache函数)