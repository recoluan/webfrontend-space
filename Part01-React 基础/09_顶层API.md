目录

[TOC]


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

# 常见面试题
