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
