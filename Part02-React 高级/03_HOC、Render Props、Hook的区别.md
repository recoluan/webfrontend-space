目录

[TOC]

# 栗子
我们从一个栗子开始吧，写一个组件来跟踪鼠标位置的组件：
```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    document.addEventListener("mousemove", event => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    });
  }

  render() {
    return (
      <div>
        当前的鼠标位置是 ({this.state.x}, {this.state.y})
      </div>
    );
  }
}
```
当光标在屏幕上移动时，显示其（x，y）坐标。

现在的问题是：我们如何在另一个组件中复用这个行为？换个说法，若另一个组件需要知道鼠标位置，我们能否封装这一行为?

接下来，我会用 HOC、Render Props、Hook 这三种方式，示范组件封装的技巧。[online-demo](https://codesandbox.io/s/hoc-render-props-hook-m7gw1)

1. **使用 HOC 实现**
```js
import withMouse from "./withMouse";

const MouseTracker = props => {
  return (
    <div>
      当前的鼠标位置是 ({props.x}, {props.y})
    </div>
  );
};

export default withMouse(MouseTracker);
```

```js
const withMouse = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
      document.addEventListener("mousemove", event => {
        this.setState({
          x: event.clientX,
          y: event.clientY
        });
      });
    }

    render() {
      // HOC 将鼠标位置信息 this.state，以 prop 的形式，传递给 WrappedComponent
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};
```


2. **使用 Render Props 实现**

```js
const MouseTracker = props => {
  return (
    <Mouse>
      {({ x, y }) => (
        <div>
          当前的鼠标位置是 ({x}, {y})
        </div>
      )}
    </Mouse>
  );
};
```
这里渲染一个 Mouse 组件，这个组件接受一个 Render Props，这个 props 是一个函数，当这个函数被调用时，会**将它的 state 暴露**给 MouseTracker 组件。

```js
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    document.addEventListener("mousemove", event => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    });
  }

  render() {
    // 使用 children prop 动态决定要渲染的内容
    return <div>{this.props.children(this.state)}</div>;
  }
}
```

3. **使用 Hook 实现**
```js
import useMouse from "./useMouse";

const MouseTracker = () => {
  const mouse = useMouse();

  return (
    <div>
      当前的鼠标位置是 ({mouse.x}, {mouse.y})
    </div>
  );
};
```
自定义一个Hook：
```js
const useMouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onMouseMove = e => {
    setX(e.clientX);
    setY(e.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });

  return { x, y };
};
```
是不是非常的简洁呀 

# 优缺点对比
1. HOC
- 优点
  + 高阶组件就是一个没有副作用的纯函数，各个高阶组件不会互相依赖耦合
  + 返回的高阶组件，内部有state、生命周期等
- 缺点
  + 当存在多个 HOC 时，无法清晰地标识 props 的来源
  + 同名 props 覆盖：相同名称的 props，则存在覆盖问题，并不会报错
  + 多层嵌套：HOC 可能出现多层包裹组件的情况，加深组件层级，不利于调试

2. Render Props
- 优点：代码简洁
- 缺点
  + 无法在 return 外访问数据
  + Render Props 虽然没有组件多层嵌套的问题，但是转化为函数回调的嵌套

一般用在样式的封装上。

3. Hook
- 优点
  + 解决了 HOC 和 Render Props 的嵌套问题，更加简洁
  + 清晰地标识数据的来自哪个 Hook
  + 可以重命名：多个 Hook 暴露同名参数，不会覆盖
  + 可以让你在 return 之外使用数据
- 缺点

# 参考文档
- [React Hooks 你真的用对了吗？](https://zhuanlan.zhihu.com/p/85969406)
- [React拾遗：Render Props及其使用场景](https://juejin.im/post/5b2f99ea6fb9a00e3a5aa511#heading-3)



# 常见面试题
## 谈一谈 HOC、Render props、Hooks（重要）