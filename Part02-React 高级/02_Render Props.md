目录

[TOC]

# 什么是 render prop ？
我们来看官方文档的解释：
>- 术语 “render prop” 是指一种在 React 组件之间使用一个**值为函数的 prop** 共享代码的简单技术
>- 具有 render prop 的组件，接受一个函数，该函数返回一个 React 元素。
>- 更具体地说，**render prop 是一个用于告知组件需要渲染什么内容的函数 prop**。


```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```


使用 render prop 的库有 React Router:
```js
<Route path="/home" render={() => <div>Home</div>} />
```

# children prop
render prop 是因为模式才被称为 render prop，属性名不一定要使用 render。

**也可以简单地使用 children prop！**
```js
<Mouse children={mouse => (
  <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
)}/>
```

记住，children prop 并不真正需要添加到 JSX 元素的 “attributes” 列表中。相反，你可以直接放置到元素的内部！
```js
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
  )}
</Mouse>
```


# 与 React.PureComponent 一起使用
如果在 render 方法里创建函数，每次渲染都会生成一个新的函数，这样会导致具有 render prop 的组件重新渲染，这样再使用 React.PureComponent 就没有什么效果。

为了解决这个问题，可以定义 prop 函数为组件实例方法：

```js
class MouseTracker extends React.Component {
  // 定义为实例方法
  renderTheMouse = (mouse) => {
    return (<div>
      当前的鼠标位置是 ({mouse.x}, {mouse.y})
    </div>);
  }

  render() {
    return (
      <Mouse render={this.renderTheMouse} />
      // // 这是不好的！每个 render prop 的值是不同的。
      // <Mouse
      //   render={mouse => (
      //     <div>
      //       当前的鼠标位置是 ({mouse.x}, {mouse.y})
      //     </div>
      //   )}
      // />
    );
  }
}
```

