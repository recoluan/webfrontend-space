目录

[TOC]

# 什么是 Portal？
React 中默认按照层级渲染（父组件嵌套子组件，不断的嵌套的 DOM 树来渲染），那么，如何让子组件渲染到父组件以外？

> Portal（传送门） 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
```js
ReactDOM.createPortal(child, container)
```


# 应用

Portal 应用场景：
- 当**父组件有 overflow: hidden 样式**时，设置 BFC 会限制子组件的展示，子组件能够“跳出”其父容器
- 当**父组件 z-index 太小**时，子组件逃离父组件
- **position 为 fixed 的子元素，需要放到 body 第一层级中去渲染**

例如，对话框、悬浮卡以及提示框


```js
const Model = props => {
  // 正常渲染
  // return (
  //   <div className="modal">
  //     model-content
  //   </div>
  // );

  // 使用 Portals 渲染到 body 上。
  // fixed 元素要放在 body 上，有更好的浏览器兼容性。
  return ReactDOM.createPortal(
    <div className="modal">model-content</div>,
    document.body // DOM 节点
  );
};
```

```css
.modal {
  position: fixed;
  width: 300px;
  height: 100px;
  top: 100px;
  left: 50%;
  margin-left: -150px;
  background-color: #000;
  color: #fff;
  text-align: center;
}
```